import modals from "./modules/modals.js"
import passwordVisibility from "./modules/passwordVisibility.js"
import postLogin from "./requests/login.js"
import postNewUser from "./requests/postNewUser.js"
import StorageToken from "../scripts/modules/StorageToken.js"
import StorageUserId from "../scripts/modules/StorageUserId.js"
import Optional from "../scripts/modules/Optional.js"
import { classToggler, sourceToggler, typeToggler } from "./utils/togglers.js"
import gtHeaders from "./requests/gtHeaders.js"

const overlay = document.querySelector("div.overlay");
const nav = document.querySelector("nav#menu");
const ulNav = document.querySelector("ul");

const loginModalOpenButton = document.querySelector("button#entrar.menu");
const loginModalCloseButton = document.querySelector("button.login.fechar");
const loginModalContent = document.querySelector("div.login.modal");
const loginButton = document.querySelector("button.entrar");
const loginEmail = document.querySelector("input#email-login");

const registerModalOpenButton = document.querySelector("button#cadastrar.menu");
const registerModalCloseButton = document.querySelector("button.cadastro.fechar");
const registerModalContent = document.querySelector("div.cadastro.modal");
const registerButton = document.querySelector("button#cadastro-cadastrar");
const registerName = document.querySelector("input#cadastro-nome");
const registerUsername = document.querySelector("input#cadastro-usuario");
const registerEmail = document.querySelector("input#cadastro-email");
const passwordRegisterInput = document.querySelector("input#cadastro-senha");
const passwordConfirmInput = document.querySelector("input#confirma-senha");
const passwordConfirmButton = document.querySelector("div#botao-confirma-senha");

const passwordRegisterButton = document.querySelector("div#botao-cadastro-senha");
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

loginButton.addEventListener('click', () => {

	const requestBody = { "email": loginEmail.value, 
						  "senha": passwordLoginInput.value }

	const request = postLogin(gtHeaders.commom(), requestBody)
	
	fetch(request.url, request.init)
		.then(response => response.json())						
		.then(json => {

			const token = Optional.of(json.token)
								  .filter(token => token.length > 1)
								  .getOrElse(() => { throw new Error("Token inválido")})

			const id = Optional.of(json.id)
							   .filter(id => !isNaN(id))
							   .getOrElse(() => { throw new Error("Id inválido")})

			StorageToken.storeToken(token)
			StorageUserId.storeUserId(id)
		})
		.then(() => window.location.pathname = "/front-end/views/listaDeViagem.html")
		.catch(error => console.log(error));
})

registerButton.addEventListener('click', () => {

	const requestBody = { "nome": registerName.value,
						  "username": "@" + registerUsername.value,
						  "email": registerEmail.value,
						  "ativo": true,
						  "senha": Optional.of(passwordRegisterInput.value)
										   .filter(password => password === passwordConfirmInput.value)
										   .getOrElse(() => { throw new Error("Senhas não são iguais")}) }

	const request = postNewUser( gtHeaders.commom(), requestBody)

	fetch(request.url, request.init)
		.then(res => res.json())
		.then(json => console.log(json))
		.catch(error => console.log(error));
})

window.addEventListener('load', () => {

	passwordFieldsList.forEach(field => {
		pv.addTypeListeners(field)
		pv.addSourceListeners(field) 
	})

	definedModalsList.forEach(modal => {
		md.addOpenedListeners(modal);
		md.addClosedListeners(modal);
		md.addTogglingListeners(modal);
	})
})
