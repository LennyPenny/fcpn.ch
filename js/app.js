var lookUp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function base62(n, b) {
	var res = []
	do {
		var idk = n % b;
		res.unshift(lookUp.charAt(idk))
		n = Math.floor(n / b)
	} while (n > 0);
	return res.join("");
}

angular.module("fcpnchIt", ["ngAnimate"])
    .controller("shortner", function($scope) {
        $scope.toShortn = ""
        $scope.onChange = function() {
            $scope.invalidIn = false
            $scope.shortned = false
            if ($scope.toShortn.length > 1) {
                var re = /(.=)?(#\w+)?\d{2,}/g;
                var arr = $scope.toShortn.match(re);
                
                if (arr != null) {
                    var threadID = "";
                    var postID = "";
                    
                    for (var tag in arr) {
                        if (arr[tag].slice(0, 2) == "p=") {
                            postID = arr[tag].slice(2);
                        } else if (arr[tag].slice(0, 2) == "t="){
                            threadID = arr[tag].slice(2);
                        } else if (postID.length < 1 && arr[tag].slice(0, 5) == "#post" ) {
                            console.log("lel");
                            postID = arr[tag].slice(5);
                        }
                    }
                    
                    var shortPostID = base62(Number(postID), 62);
                    
                    if (postID.length > 0) {
                        $scope.shortned = "fcpn.ch/" + shortPostID;
                    } else {
                        $scope.invalidIn = true;
                    }
                } else {
                    $scope.invalidIn = true;
                }
            }
        }
    })