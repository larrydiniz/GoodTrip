import menu from "./modules/menu.js"
import modals from "./modules/modals.js"
import { classToggler } from "./utils/togglers.js"

const nav = document.getElementById("menu");
const btn = document.querySelector(".menu-landing");
const overlay = document.querySelector("div.overlay");
const ulNav = document.querySelector("ul");
const loginModalOpenButton = document.querySelector("button#entrar.menu");
const loginModalCloseButton = document.querySelector("button.login.fechar");
const loginModalContent = document.querySelector("div.login.modal");
const registerModalOpenButton = document.querySelector("button#cadastrar.menu");
const registerModalCloseButton = document.querySelector("button.cadastro.fechar");
const registerModalContent = document.querySelector("div.cadastro.modal");

const md = modals(classToggler);
const mnu = menu(classToggler);

const menuMobile = mnu.defineMenu({ openButton: btn,
								    content: nav, 
								    visibilityClass: "show" });
								  
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

mnu.addOpenedListeners({ menu: menuMobile });

md.addOpenedListeners({ modal: loginModal });
md.addClosedListeners({ modal: loginModal });
md.addTogglingListeners({ modal: loginModal });

md.addOpenedListeners({ modal: registerModal });
md.addClosedListeners({ modal: registerModal });
md.addTogglingListeners({ modal: registerModal });
