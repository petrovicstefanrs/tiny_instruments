/**
 * SPLASH SCREEN HANDLER
 * Handles splash screen on app init
 */

const splashScreen = document.getElementById('splashScreen');
const splashScreenClassName = splashScreen.classList[0];
const splashButton = document.getElementById('splashButton');
export let splashScreenActive = true;

export const handleSplashScreen = () => {
  splashScreen.classList.add(`${splashScreenClassName}-hidden`);
  setTimeout(() => {
    splashScreen.remove();
    splashScreenActive = false;
  }, 4000);
};

splashButton.addEventListener('click', handleSplashScreen);
