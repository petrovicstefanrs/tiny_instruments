/**
 * CONSTANTS
 * Set CONSTANTS
 */

const INSTRUMENTS_LIB = {
	instruments: [
		'violin',
		'trumpet',
		'keyboard',
		'disco',
		'piano',
		'sax',
		'acoustic-guitar',
		'electric-guitar',
	],
};

const CYCLE_DIRECTIONS = {
	left: 'left',
	right: 'right',
};

const BASE_IMAGE = './images/';
const BASE_SOUND = './music/';

/**
 * INSTRUMENT PLAYER HANDLER
 * Handles playing and stopping intsruments
 */

let instrumentNumber = 0;
let instrumentActive = false;
let instrumentAudio = document.getElementById('instrumentAudio');
let instrumentIcon = document.getElementById('instrumentIcon');

const pulseAnimation = 'ti-AnimationPulse';
const bodyAnimation = 'ti-AnimationBody';

const setContent = () => {
	instrumentIcon.style.backgroundImage = `url(${BASE_IMAGE}${
		INSTRUMENTS_LIB.instruments[instrumentNumber]
	}.png)`;

	instrumentAudio.src = `${BASE_SOUND}${
		INSTRUMENTS_LIB.instruments[instrumentNumber]
	}.mp3`;
};

const stopInstrument = () => {
	instrumentActive = false;
	instrumentIcon.classList.remove(pulseAnimation);
	document.body.classList.remove(
		`${bodyAnimation}-${INSTRUMENTS_LIB.instruments[instrumentNumber]}`
	);
	instrumentAudio.pause();
	instrumentAudio.currentTime = 0;
};

const startInstrument = () => {
	if (!instrumentActive) {
		instrumentIcon.classList.add(pulseAnimation);
		document.body.classList.add(
			`${bodyAnimation}-${INSTRUMENTS_LIB.instruments[instrumentNumber]}`
		);
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
 * INIT
 * Initialize the app
 */

document.addEventListener('onload', setContent());
