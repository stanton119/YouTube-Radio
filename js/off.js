// radioState = 0;



// turn on/off video
// if (radioState==0){
// 	console.log("Removing video");
// 	mediaElement.parentNode.removeChild(mediaElement);
// 	radioState = 1;
// 	radioButton.className = "ytp-button ytp-button-watch-later ytp-button-radio ytp-button-radio-on";
// } else {
	console.log("Inserting video");
	parentNode.appendChild(videoAmbiPlayer);
	radioState = 0;
	// radioButton.className = "ytp-button ytp-button-watch-later ytp-button-radio";
// }

// setup play status/seek time
if (!paused) {
	console.log('playing audio');
	videoAmbiPlayer.play();		
}