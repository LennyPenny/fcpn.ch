function copyTextToClipboard(text) {
    var copyFrom = $("<textarea/>");
    copyFrom.text(text);

    $("body").append(copyFrom);

    copyFrom.select();
    document.execCommand("copy");

    copyFrom.remove();
};

function callBack(msg, sender, sendResponse) {
	if (sender.id == chrome.runtime.id) { //making sure you don't clipboard poisen us
		copyTextToClipboard(msg);
		sendResponse();
	};
};

var lookUp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function base10(str) {
	for (decodedNum = 0, i = len = str.length; i--;) {
		decodedNum += lookUp.indexOf(str[i]) * Math.pow(62, len - i - 1);
	}
	return decodedNum;
}

chrome.runtime.onMessage.addListener(callBack);

chrome.webRequest.onBeforeRequest.addListener(
	function(newPage) {
		postId = base10(newPage.url.match(/^https?:\/\/fcpn\.ch\/(.*)$/)[1]);
		console.log("Redirecting to: %s", postId);
		return { redirectUrl: "http://www.facepunch.com/showthread.php?p="+postId+"#post"+postId }
	}, {
		urls: ["*://fcpn.ch/*"]
	}, [
		"blocking"
	]
) 