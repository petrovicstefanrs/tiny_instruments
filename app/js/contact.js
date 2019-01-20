/**
 * CONTACT FORM HANDLER
 * Handles contact form
 */

const contactContainer = document.getElementById('contactContainer');
const contactButton = document.getElementById('contactButton');
const contactOverlay = document.getElementById('contactOverlay');

const contactContainerClassName = contactContainer.classList[0];
const contactContainerClassNameActive = `${contactContainerClassName}-active`
const contactContainerClassNameDisabled = `${contactContainerClassName}-disabled`;

const contactInputName = document.getElementById('contactName');
const contactInputEmail = document.getElementById('contactEmail');

let contactActive = false;

function openContact() {
	if(!contactActive) {
		contactContainer.classList.add(contactContainerClassNameActive);
		contactContainer.classList.remove(contactContainerClassNameDisabled);
		contactActive = true;
	}
	else {
		closeContact();
	}
}

function closeContact() {
	contactContainer.classList.add(contactContainerClassNameDisabled);
	contactContainer.classList.remove(contactContainerClassNameActive);
	contactInputName.value = '';
	contactInputEmail.value = '';
	contactActive = false;
}

contactButton.addEventListener('click', () => {
	openContact();
});

contactOverlay.addEventListener('click', () => {
	openContact();
});
