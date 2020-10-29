import passwordVisibility from './modules/passwordVisibility.js'
import menu from './modules/menu.js'
import { classToggler, typeToggler, sourceToggler } from './utils/togglers.js'

const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');
const actualPasswordInput = document.querySelector("input#senha-atual");
const actualPasswordButton = document.querySelector("div#senha-atual-visibilidade");
const newPasswordInput = document.querySelector("input#nova-senha");
const newPasswordButton = document.querySelector("div#nova-senha-visibilidade");
const confirmPasswordInput = document.querySelector("input#confirmar-senha");
const confirmPasswordButton = document.querySelector("div#confirmar-senha-visibilidade");

const passwordInputTypes = Object.defineProperties({}, { primary: { value: "password", writable: false} , secondary: { value: "text", writable: false }});
const passwordIconSources = Object.defineProperties({}, { primary: { value: "../public/icons/olho-fechado.svg", writable: false} , secondary: { value: "../public/icons/olho-aberto.svg", writable: false }});

const mnu = menu(classToggler);
const pv = passwordVisibility(typeToggler, sourceToggler);

const actualPasswordField = pv.defineField({ button: actualPasswordButton, 
											 input: actualPasswordInput, 
											 types: passwordInputTypes,
											 sources: passwordIconSources});

const newPasswordField = pv.defineField({ button: newPasswordButton, 
										  input: newPasswordInput, 
										  types: passwordInputTypes,
										  sources: passwordIconSources});


const confirmPasswordField = pv.defineField({ button: confirmPasswordButton,
											  input: confirmPasswordInput,
											  types: passwordInputTypes,
											  sources: passwordIconSources});

const mobileMenu = mnu.defineMenu({ openButton: menuButton,
									content: navMenu,
									visibilityClass: "show" });

mnu.addOpenedListeners({ menu: mobileMenu });

pv.addTypeListeners({ field: actualPasswordField });
pv.addSourceListeners({ field: actualPasswordField });

pv.addTypeListeners({ field: newPasswordField });
pv.addSourceListeners({ field: newPasswordField });

pv.addTypeListeners({ field: confirmPasswordField });
pv.addSourceListeners({ field: confirmPasswordField });