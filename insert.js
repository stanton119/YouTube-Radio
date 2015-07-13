var mediaElement;
var parentNode;
var radioButton;
var radioState = 0;	// assume off
var paused;			// paused state

// youtube reuses same video container, so no need to store radioState and tabID between sessions

function video2audio(){
	// **** check whether flash or html5 **** //
	// check for valid YouTube URL
	if (window.location.href.indexOf("www.youtube.com/watch") == -1) {
		console.log("Not video page");
		return;
	}
	
	// get first video element
	mediaElement = document.getElementsByClassName('html5-main-video')[0];
	
	// check for html5/flash
	// if flash, append html5=1 to url, reload
	if (typeof mediaElement == "undefined") {
		// no html5, reload with tag
		if (window.location.href.toLowerCase().indexOf("html5=1") == -1){
			console.log("Refreshing to HTML5 page");
			window.location.href = window.location.href + '&html5=1';
		}
		// still using flash - ignore
		console.log("Still on flash - ignore, only works with html5");
		return;
	}
		
	// setup parent node
	parentNode = mediaElement.parentNode;
	
	
	// **** add player button **** //
	
	// check for button already
	if (document.getElementsByClassName('ytp-button ytp-button-watch-later ytp-button-radio').length>0){
		console.log("Button already added");
		return;
	}
	
	// get last player button class
	// youtube class: html5-main-video
	console.log("Getting last button");
	var Buttons = document.getElementsByClassName('ytp-button ytp-button-watch-later');
	var playButton = Buttons[Buttons.length - 1];
	
	// create radioButton
	console.log("cloning last button");
	radioButton = playButton.cloneNode(true);
	radioButton.className = "ytp-button ytp-button-watch-later ytp-button-radio";
	
	// add node
	playButton.parentNode.appendChild( radioButton );
	console.log("Added radio button");
	
	// get radio state
	if (radioState == 1){
		// change class based on radio state
		radioButton.className = "ytp-button ytp-button-watch-later ytp-button-radio ytp-button-radio-on";
	}
	
	// add listener to button
	radioButton.addEventListener('click', radioStateChange, false);
	radioButton.addEventListener('mouseover', radioStateOver, false);
	radioButton.addEventListener('mouseout', radioStateOut, false);
}

function radioStateOver()
{
	// add underneath id:movie_player, new child
	var movPlayer = document.getElementById('movie_player');
	// find caption left spacing	
	var leftDist = radioButton.getBoundingClientRect().left - movPlayer.getBoundingClientRect().left + 15;
	// find top distance
	var topDist = radioButton.getBoundingClientRect().top - 60;
	
	// add caption box to DOM
	var html = '<div class="ytp-tooltip" style="left: ' + leftDist + 'px; top: ' + topDist + 'px; display: block;"><div class="ytp-tooltip-body" style="left: -34px;"><span class="ytp-text-tooltip">Radio Mode</span></div><div class="ytp-tooltip-arrow"></div></div>';
	
	var div = document.createElement('div');
	div.innerHTML = html;
	while (div.children.length > 0) {
		movPlayer.appendChild(div.children[0]);
	}
}

function radioStateOut()
{  
	// remove caption box
	var tooltips = document.getElementsByClassName('ytp-tooltip');
	for (var i=0;i<tooltips.length;i++)
	{ 
		tooltips[i].parentNode.removeChild(tooltips[i]);
	}
}

function radioStateChange(){
	// get playing state
	paused = mediaElement.paused;
	
	// turn on/off video
	if (radioState==0){
		console.log("Removing video");
		mediaElement.parentNode.removeChild(mediaElement);
		radioState = 1;
		radioButton.className = "ytp-button ytp-button-watch-later ytp-button-radio ytp-button-radio-on";
	} else {
		console.log("Inserting video");
		parentNode.appendChild(mediaElement);
		radioState = 0;
		radioButton.className = "ytp-button ytp-button-watch-later ytp-button-radio";
	}
	
	// setup play status/seek time
	if (!paused) {
		console.log('playing audio');
		mediaElement.play();		
	}
}


// **** main **** //
console.log("Loading insert");
video2audio();
console.log("Finished");