chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log(tab.url);
	if (tab.url.indexOf("www.youtube.com/watch") == -1) {
		console.log("Not video page - 2");
		return;
	}
	if (changeInfo.url !== undefined && changeInfo.url.indexOf("www.youtube.com/watch") == -1) {
			console.log("Not video page");
			return;
		}
	if (changeInfo.status != "complete") {
		console.log("Not finished loading");
		return;
	}
	console.log("Finished loading, inserting code");
	chrome.tabs.executeScript(tabId, { file: 'insert.js' });
});
