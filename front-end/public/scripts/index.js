import modals from "./modules/modals.js"
import passwordVisibility from "./modules/passwordVisibility.js"
import { classToggler, sourceToggler, typeToggler } from "./utils/togglers.js"

const overlay = document.querySelector("div.overlay");
const nav = document.querySelector("nav#menu");
const ulNav = document.querySelector("ul");
const loginModalOpenButton = document.querySelector("button#entrar.menu");
const loginModalCloseButton = document.querySelector("button.login.fechar");
const loginModalContent = document.querySelector("div.login.modal");
const registerModalOpenButton = document.querySelector("button#cadastrar.menu");
const registerModalCloseButton = document.querySelector("button.cadastro.fechar");
const registerModalContent = document.querySelector("div.cadastro.modal");
const passwordRegisterButton = document.querySelector("div#botao-cadastro-senha");
const passwordRegisterInput = document.querySelector("input#cadastro-senha");
const passwordConfirmButton = document.querySelector("div#botao-confirma-senha");
const passwordConfirmInput = document.querySelector("input#confirma-senha");
const passwordLoginButton = document.querySelector("div#botao-senha-login");
const passwordLoginInput = document.querySelector("input#senha-login");

const passwordInputTypes = Object.defineProperties({}, { primary: { value: "password", writable: false} , secondary: { value: "text", writable: false }});
const passwordIconSources = Object.defineProperties({}, { primary: { value: "../public/icons/olho-fechado.svg", writable: false} , secondary: { value: "../public/icons/olho-aberto.svg", writable: false }});

const md = modals(classToggler);
const pv = passwordVisibility(typeToggler, sourceToggler);

const passwordRegisterField = pv.defineField({ button: passwordRegisterButton, 
									           input: passwordRegisterInput, 
									           types: passwordInputTypes,
									           sources: passwordIconSources});


const confirmPasswordField = pv.defineField({ button: passwordConfirmButton,
		                                      input: passwordConfirmInput,
		                                      types: passwordInputTypes,
											  sources: passwordIconSources});

const loginPasswordField = pv.defineField({ button: passwordLoginButton,
											input: passwordLoginInput,
											types: passwordInputTypes,
											sources: passwordIconSources});
								  
const loginModal = md.defineModal({ openButton: loginModalOpenButton,
	                                closeButton: loginModalCloseButton,
	                                content: loginModalContent,
	                                modalOverlay: overlay,
	                                visibilityClass: "show" });

const registerModal = md.defineModal({ openButton: registerModalOpenButton,
                                       closeButton: registerModalCloseButton,
                                       content: registerModalContent,
                                       modalOverlay: overlay,
                                       visibilityClass: "show" });
								  
nav.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));
overlay.addEventListener("toggling", classToggler({element: ulNav, toggleClass: "hide"}));

md.addOpenedListeners({ modal: loginModal });
md.addClosedListeners({ modal: loginModal });
md.addTogglingListeners({ modal: loginModal });

md.addOpenedListeners({ modal: registerModal });
md.addClosedListeners({ modal: registerModal });
md.addTogglingListeners({ modal: registerModal });

pv.addTypeListeners({ field: passwordRegisterField });
pv.addSourceListeners({ field: passwordRegisterField });

pv.addTypeListeners({ field: confirmPasswordField });
pv.addSourceListeners({ field: confirmPasswordField });

pv.addTypeListeners({ field: loginPasswordField });
pv.addSourceListeners({ field: loginPasswordField });