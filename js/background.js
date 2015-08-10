// on by default, use localstorage to keep state
var radioEnabled;
chrome.storage.sync.get('radioEnabled', function(data) {
	if (data.radioEnabled === undefined) {
		chrome.storage.sync.set({radioEnabled: 'on'});
		radioEnabled = true;
	} else if (data.radioEnabled === 'on') {
		radioEnabled = true;
	} else {
		radioEnabled = false;
	}
});
console.log("Default radio mode: "+radioEnabled);

chrome.tabs.onUpdated.addListener(function(tab_id, change_info, updated_tab) {
	// onUpdated
	if (isYoutubeTab(updated_tab)) {
		showIcon(updated_tab.id);
		console.log("Ambilight: "+radioEnabled);
		if (radioEnabled) {
			console.log("Turning on");
			turnOn(tab_id);
		}
	}
});
chrome.pageAction.onClicked.addListener(function(tab) {
	radioEnabled = !radioEnabled;
	// use storage for persistence
	chrome.storage.sync.get('radioEnabled', function(data) {
		if (data.radioEnabled === 'on') {
			chrome.storage.sync.set({radioEnabled: 'off'});
		} else {
			chrome.storage.sync.set({radioEnabled: 'on'});
		}
	});
	
	// change icon
	icon_path = radioEnabled ? "img/on.png" : "img/off.png";
	chrome.pageAction.setIcon({tabId: tab.id, path:icon_path});
	// turn on/off radio mode
	if (radioEnabled) {
		turnOn(tab.id);
	} else {
		turnOff(tab.id);
	}
	console.log("Triggering radio mode: "+radioEnabled);
});
function isYoutubeTab(tab) {
	return tab.url.match(/youtube/);
}
function turnOff(tab_id) {
	chrome.tabs.executeScript(tab_id, {file: "js/off.js"});
}
function turnOn(tab_id) {
	chrome.tabs.executeScript(tab_id, {file: "js/on.js"});
}
function showIcon(tab_id) {
	chrome.pageAction.show(tab_id);
	console.log("showing radio mode: "+radioEnabled);
	icon_path = radioEnabled ? "img/on.png" : "img/off.png";
	chrome.pageAction.setIcon({tabId: tab_id, path:icon_path});
}

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
	// direct to welcome page

    if(details.reason == "install"){
        console.log("First time install, show website");
		// new tab with install page
		chrome.tabs.create({url: "http://www.richard-stanton.com/chrome-plugins/youtube-radio/radioinstall/"});
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
		// show if updating from 1.2, only for future versions >2.0.1
		// if (details.previousVersion == "1.2") {
			chrome.tabs.create({url: "http://www.richard-stanton.com/chrome-plugins/youtube-radio/radioinstall/"});
		// }
    }
});