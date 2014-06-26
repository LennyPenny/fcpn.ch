local lookUp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

local function to10(str, b)
	res = 0
	for i = 1, #str, 1 do
		local char = string.sub(str, i, i)
		local pos = string.find(lookUp, char)
		if not pos then
			return false, char
		end
		pos = pos -1

		res = res + pos * math.pow(b, #str - i)
	end
	return res, "fine"
end


local uri = ngx.unescape_uri(string.sub(ngx.var.uri, 2))
if #uri == 0 then ngx.redirect("http://shortn.fcpn.ch") return end

local postID, err = to10(string.match(uri, "%w+"), 62)
if not postID then ngx.say("Invalid char: "..err) return end

ngx.redirect("http://facepunch.com/showthread.php?p="..parts[1].."#post"..parts[1])