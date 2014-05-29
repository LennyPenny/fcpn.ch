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

chrome.runtime.onMessage.addListener(callBack);