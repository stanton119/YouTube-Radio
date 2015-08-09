var attempts = 0;

// setup Radio Mode
function setupRadioMode() {
	console.log("Radio Mode: Setting up Radio Mode");
	
	
	// ignore if already setup
	if (typeof radioState != 'undefined') {
		if (radioState)
			return;
	}
	
	// get video (as global)
	videoAmbiPlayer = document.getElementsByClassName("html5-main-video")[0];
	
	// attempt again if failed
	if (typeof videoAmbiPlayer == "undefined") {
		// only attempt 20 time
		if (attempts<20) {
			setTimeout(function () {
				setupRadioMode();
			}, 500);
			attempts = attempts+1;
		}
		return;
	}
	
	// setup parent node
	parentNode = videoAmbiPlayer.parentNode;
	
	turnOffVideo();
	
	// videoAmbiPlayer.crossOrigin = 'anonymous';
}

function turnOffVideo() {
	// get playing state
	paused = videoAmbiPlayer.paused;
	
	// turn off video
	console.log("Radio Mode: Removing video");
	videoAmbiPlayer.parentNode.removeChild(videoAmbiPlayer);
	radioState = 1;
	
	// setup play status/seek time
	if (!paused) {
		console.log("Radio Mode: playing audio");
		videoAmbiPlayer.play();		
	}
}

setupRadioMode();