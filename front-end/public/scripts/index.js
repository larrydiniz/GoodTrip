import modals from "./modules/modals.js"
import passwordVisibility from "./modules/passwordVisibility.js"
import { classToggler, sourceToggler, typeToggler } from "./utils/togglers.js"

const overlay = document.querySelector("div.overlay");
const nav = document.querySelector("nav#menu");
const ulNav = document.querySelector("ul");
const loginModalOpenButton = document.querySelector("button#entrar.menu");
const loginModalCloseButton = document.querySelector("button.login.fechar");
const loginModalContent = document.querySelector("div.login.modal");
const loginButton = document.querySelector("button.entrar");
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

const md = modals(classToggler, overlay, "show");
const pv = passwordVisibility(typeToggler, sourceToggler, passwordInputTypes, passwordIconSources);

const passwordRegisterField = pv.defineField(passwordRegisterButton, passwordRegisterInput);   
const confirmPasswordField = pv.defineField(passwordConfirmButton, passwordConfirmInput);
const loginPasswordField = pv.defineField(passwordLoginButton, passwordLoginInput);
const passwordFieldsList = [loginPasswordField, passwordRegisterField, confirmPasswordField];

const loginModal = md.defineModal(loginModalOpenButton, loginModalCloseButton, loginModalContent);					
const registerModal = md.defineModal(registerModalOpenButton, registerModalCloseButton, registerModalContent);
const definedModalsList = [loginModal, registerModal];
								  
nav.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));

overlay.addEventListener("toggling", classToggler({element: ulNav, toggleClass: "hide"}));

window.addEventListener('load', () => {

	loginButton.addEventListener('click', () => {
		var myHeaders = new Headers();
		
		myHeaders.append("Content-Type", "application/json");

		fetch("http://localhost:3333/usuarios/auth", 
				{ "headers": myHeaders,
				  "method": "POST",
				  "body": JSON.stringify({ "email": document.querySelector("input#email-login").value, "senha": document.querySelector("input#senha-login").value}),
				  "mode": "cors" })
		.then(res => res.text())
		.then(text => console.log(text))
		.catch(e => console.log(e))
	})

	passwordFieldsList.forEach(field => { 
		pv.addTypeListeners(field); 
		pv.addSourceListeners(field) 
	})

	definedModalsList.forEach(modal => {
		md.addOpenedListeners(modal);
		md.addClosedListeners(modal);
		md.addTogglingListeners(modal);
	})
})
