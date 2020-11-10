import passwordVisibility from './modules/passwordVisibility.js'
import { typeToggler, sourceToggler } from './utils/togglers.js'

const actualPasswordInput = document.querySelector("input#senha-atual");
const actualPasswordButton = document.querySelector("div#senha-atual-visibilidade");
const newPasswordInput = document.querySelector("input#nova-senha");
const newPasswordButton = document.querySelector("div#nova-senha-visibilidade");
const confirmPasswordInput = document.querySelector("input#confirmar-senha");
const confirmPasswordButton = document.querySelector("div#confirmar-senha-visibilidade");
const passwordInputTypes = Object.defineProperties({}, { primary: { value: "password", writable: false} , secondary: { value: "text", writable: false }});
const passwordIconSources = Object.defineProperties({}, { primary: { value: "../public/icons/olho-fechado.svg", writable: false} , secondary: { value: "../public/icons/olho-aberto.svg", writable: false }});

const pv = passwordVisibility(typeToggler, sourceToggler, passwordInputTypes, passwordIconSources);

const actualPasswordField = pv.defineField(actualPasswordButton, actualPasswordInput);
const newPasswordField = pv.defineField(newPasswordButton, newPasswordInput);
const confirmPasswordField = pv.defineField(confirmPasswordButton, confirmPasswordInput);
const passwordFieldsList = [actualPasswordField, newPasswordField, confirmPasswordField];

window.addEventListener('load', () => {

	passwordFieldsList.forEach(field => { pv.addTypeListeners(field); pv.addSourceListeners(field) });

})