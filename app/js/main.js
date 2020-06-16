/**
 * CONSTANTS
 * Set CONSTANTS
 */

const INSTRUMENTS_LIB = {
	instruments: [
		'violin',
		'trumpet',
		'keyboard',
		'piano',
		'sax',
		'acoustic-guitar',
		'electric-guitar',
		'disco',
	],
};

const CYCLE_DIRECTIONS = {
	left: 'left',
	right: 'right',
};

const BASE_IMAGE = './images/instruments/';
const BASE_SOUND = './music/';

/**
 * INSTRUMENT PLAYER HANDLER
 * Handles playing and stopping intsruments
 */

let instrumentNumber = 0;
let instrumentActive = false;
let oldInstrumentClass = null;
const instrumentAudio = document.getElementById('instrumentAudio');
const instrumentIcon = document.getElementById('instrumentIcon');

const instrumentBackground = 'ti-Content';
const instrumentPlaying = 'ti-Content-instrument-playing';

const setContent = () => {
	instrumentIcon.style.backgroundImage = `url(${BASE_IMAGE}${
		INSTRUMENTS_LIB.instruments[instrumentNumber]
	}.svg)`;

	instrumentAudio.src = `${BASE_SOUND}${
		INSTRUMENTS_LIB.instruments[instrumentNumber]
	}.mp3`;

	let newInstrumentClass = `${instrumentBackground}-${INSTRUMENTS_LIB.instruments[instrumentNumber]}`;
	oldInstrumentClass
		? instrumentIcon.parentElement.classList.replace(oldInstrumentClass,newInstrumentClass)
		: instrumentIcon.parentElement.classList.add(oldInstrumentClass,newInstrumentClass);
	oldInstrumentClass = newInstrumentClass;
};

const stopInstrument = () => {
	instrumentActive = false;
	instrumentIcon.classList.remove(instrumentPlaying);
	instrumentAudio.pause();
	instrumentAudio.currentTime = 0;
};

const startInstrument = () => {
	if (!instrumentActive) {
		instrumentIcon.classList.add(instrumentPlaying);
		instrumentAudio.loop = true;
		instrumentAudio.play();
		instrumentActive = !instrumentActive;
	} else {
		stopInstrument();
	}
};

instrumentIcon.addEventListener('click', startInstrument);

/**
 * CYCLE HANDLER
 * Handles cycling through intsruments
 */

const BUTTON_LEFT = document.getElementById('arrow-left');
const BUTTON_RIGHT = document.getElementById('arrow-right');

const cycleInstruments = (direction = CYCLE_DIRECTIONS.left) => {
	stopInstrument();

	if (direction === CYCLE_DIRECTIONS.left) {
		if (instrumentNumber <= 0) {
			instrumentNumber = INSTRUMENTS_LIB.instruments.length - 1;
		} else {
			instrumentNumber--;
		}
	} else {
		if (instrumentNumber >= INSTRUMENTS_LIB.instruments.length - 1) {
			instrumentNumber = 0;
		} else {
			instrumentNumber++;
		}
	}

	setContent();
};

BUTTON_LEFT.addEventListener('click', () =>
	cycleInstruments(CYCLE_DIRECTIONS.left)
);

BUTTON_RIGHT.addEventListener('click', () =>
	cycleInstruments(CYCLE_DIRECTIONS.right)
);

  /**
	 * KEYBOARD CONTROL HANDLER
	 * Handles keyboard controls for play/stop and navigation 
	 */
import { splashScreenActive, handleSplashScreen } from "./splash";

window.addEventListener("keydown", (e) => {
	if (e.keyCode === 32) {		
		if(splashScreenActive) {
			handleSplashScreen();
		} else {
			startInstrument();
		};
	}

	if (e.keyCode === 37) {
		cycleInstruments(CYCLE_DIRECTIONS.left);
	}

	if (e.keyCode === 39) {
		cycleInstruments(CYCLE_DIRECTIONS.right);
	}
});

/**
 * INIT
 * Initialize the app
 */

document.addEventListener('onload', setContent());
