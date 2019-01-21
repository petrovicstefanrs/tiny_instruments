/**
 * CONTACT FORM HANDLER
 * Handles subscribe form
 */

const subscribeContainer = document.getElementById('subscribeContainer');
const subscribeButton = document.getElementById('subscribeButton');
const subscribeOverlay = document.getElementById('subscribeOverlay');

const subscribeContainerClassName = subscribeContainer.classList[0];
const subscribeContainerClassNameActive = `${subscribeContainerClassName}-active`
const subscribeContainerClassNameDisabled = `${subscribeContainerClassName}-disabled`;

const subscribeInputEmail = document.getElementById('mce-EMAIL');

let subscribeActive = false;

function openSubscribe() {
	if(!subscribeActive) {
		subscribeContainer.classList.add(subscribeContainerClassNameActive);
		subscribeContainer.classList.remove(subscribeContainerClassNameDisabled);
		subscribeActive = true;
	}
	else {
		closeSubscribe();
	}
}

function closeSubscribe() {
	subscribeContainer.classList.add(subscribeContainerClassNameDisabled);
	subscribeContainer.classList.remove(subscribeContainerClassNameActive);
	subscribeInputEmail.value = '';
	subscribeActive = false;
}

subscribeButton.addEventListener('click', () => {
	openSubscribe();
});

subscribeOverlay.addEventListener('click', () => {
	openSubscribe();
});
