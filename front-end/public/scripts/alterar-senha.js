import passwordVisibility from './modules/passwordVisibility.js'
import menu from './modules/menu.js'
import { classToggler, typeToggler, sourceToggler } from './utils/togglers.js'

const mnu = menu(classToggler);
const pv = passwordVisibility(typeToggler, sourceToggler);

const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');
const actualPasswordInput = document.querySelector("input#senha-atual");
const actualPasswordButton = document.querySelector("div#senha-atual-visibilidade");
const newPasswordInput = document.querySelector("input#nova-senha");
const newPasswordButton = document.querySelector("div#nova-senha-visibilidade");
const confirmPasswordInput = document.querySelector("input#confirmar-senha");
const confirmPasswordButton = document.querySelector("div#confirmar-senha-visibilidade");

const actualPasswordField = pv.defineField({ button: actualPasswordButton, 
											 input: actualPasswordInput, 
											 types: { primary: "password", secondary: "text" },
											 sources: { primary: "../public/icons/olho-fechado.svg", secondary: "../public/icons/olho-aberto.svg" }});

const newPasswordField = pv.defineField({ button: newPasswordButton, 
										  input: newPasswordInput, 
										  types: { primary: "password", secondary: "text" },
										  sources: { primary: "../public/icons/olho-fechado.svg", secondary: "../public/icons/olho-aberto.svg" }});


const confirmPasswordField = pv.defineField({ button: confirmPasswordButton,
											  input: confirmPasswordInput,
											  types: { primary: "password", secondary: "text" },
											  sources: { primary: "../public/icons/olho-fechado.svg", secondary: "../public/icons/olho-aberto.svg" }});

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