/**
 * SPLASH SCREEN HANDLER
 * Handles splash screen on app init
 */

const splashScreen = document.getElementById('splashScreen');
const splashScreenClassName = splashScreen.classList[0];
const splashButton = document.getElementById('splashButton');

splashButton.addEventListener('click', () => {
	splashScreen.classList.add(`${splashScreenClassName}-hidden`);
	setTimeout(() => {
		splashScreen.remove();
	}, 4000);
});
