import menu from "./modules/menu.js"
import modals from "./modules/modals.js"
import { classToggler } from "./utils/togglers.js"

const md = modals(classToggler);
const mnu = menu(classToggler);

const nav = document.getElementById("menu");
const btn = document.querySelector(".menu-landing");
const overlay = document.querySelector("div.overlay");
const ulNav = document.querySelector("ul");

const menuMobile = mnu.defineMenu({ openButton: btn,
								    content: nav, 
								    visibilityClass: "show" });
								  
const loginModal = md.defineModal({ openButton: document.querySelector("button#entrar.menu"),
	                                closeButton: document.querySelector("button.login.fechar"),
	                                content: document.querySelector("div.login.modal"),
	                                modalOverlay: overlay,
	                                visibilityClass: "show" });

const registerModal = md.defineModal({ openButton: document.querySelector("button#cadastrar.menu"),
                                       closeButton: document.querySelector("button.cadastro.fechar"),
                                       content: document.querySelector("div.cadastro.modal"),
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
