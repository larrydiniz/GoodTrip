import modals from "./modules/modals.js"
import passwordVisibility from "./modules/passwordVisibility.js"
import postLogin from "./requests/login.js"
import postNewUser from "./requests/postNewUser.js"
import StorageToken from "../scripts/modules/StorageToken.js"
import StorageUserId from "../scripts/modules/StorageUserId.js"
import Optional from "../scripts/modules/Optional.js"
import { classToggler, sourceToggler, typeToggler } from "./utils/togglers.js"
import gtHeaders from "./requests/gtHeaders.js"
import swal from 'sweetalert';

const overlay = document.querySelector("div.overlay");
const nav = document.querySelector("nav#menu");
const ulNav = document.querySelector("ul");

const loginModalOpenButton = document.querySelector("button#entrar.menu");
const loginModalCloseButton = document.querySelector("button.login.fechar");
const loginModalContent = document.querySelector("div.login.modal");
const loginButton = document.querySelector("button.entrar");
const loginEmail = document.querySelector("input#email-login");
const openRegister = document.getElementById('open-register');
const forggotPass = document.getElementById('esqueci-senha');

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
const divErro = document.getElementById('erro');
const divErroC = document.getElementById('erroc')
const definedModalsList = [loginModal, registerModal];
								  
nav.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));

openRegister.addEventListener("click", function(){
	loginModalContent.classList.remove('show');
	registerModalContent.classList.add('show');
});

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
								  .getOrElse(() => {divErro.innerHTML = `<p>E-mail ou senha incorretos</p>`;})

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
	let passwordException = '';

	const password = Optional.of(passwordRegisterInput.value)
	                         .filter(password => password === passwordConfirmInput.value)
							 .getOrElse(() => {passwordException = 'Senhas não são iguais'})
	
	if (!(registerUsername.value).includes('@')){
		registerUsername.value = "@" + registerUsername.value;
	}

	const requestBody = { "nome": registerName.value,
						  "username": registerUsername.value,
						  "email": registerEmail.value,
						  "ativo": true,
						  "senha": password }

	const request = postNewUser( gtHeaders.commom(), requestBody)

	fetch(request.url, request.init)
		.then(res => res.json())
		.then(json => {
			if (json.message == undefined) {
				swal ( "Cadastro efetuado com sucesso!" , { 
					icon: "success",
					buttons : false, 
					timer : 2000 })
				.then((value) => window.location.href = "index.html");
			}
			else if(json.message !== undefined && json.message !== 'No message available') {
				divErroC.innerHTML = `<p>${json.message}</p>`;
			} else {
				divErroC.innerHTML = `<p>${passwordException}</p>`;
			}
		})
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

forggotPass.addEventListener('click', () => {
	swal({
		text: 'Digite seu e-mail cadastrado no sistema: ',
		content: "input",
		button: {
		  text: "Recuperar Senha",
		  closeModal: false,
		},
	  })
	  .then(name => {
		if (!name) throw null;

		const init = { "headers": gtHeaders.authorized(), 
		"method": "POST", 
		"body": `{"email": "${name}"}`,
		"mode": "cors",
		"redirect": "follow" }
	   
		return fetch(`http://localhost:3333/usuarios/recuperar-senha`, init);
	  })
	  .then(results => {
		return results.json();
	  })
	  .then(json => {
		  console.log(json.message)
			if(json.message !== undefined){
				swal ({
					title: "E-mail inválido!",
					text: "Tente novamente",
					icon: "error",
					buttons : false, 
					timer : 2000 })
				swal.stopLoading();
			} else {
				swal ({
					title: "E-mail Enviado!",
					text: "Caso não encontre o e-mail de recuperação, verifique a caixa de span.",
					icon: "success",
					buttons : false, 
					timer : 3000 })
				.then((value) => window.location.href = "index.html");
			} 
		}) 
	  .catch(err => {
		if (err) {
		  swal("Erro", "Falha ao enviar e-mail. Tente novamente", "error");
		} else {
		  swal.stopLoading();
		  swal.close();
		}
	  });
})




/* 
https://firebase.google.com/docs/auth/web/google-signin?hl=pt-br 
https://developers.google.com/identity/sign-in/web/sign-in
https://firebase.google.com/docs/auth/android/google-signin?hl=pt-Br
https://developers.google.com/api-client-library/java/google-api-java-client/oauth2

*/

/* S3nh40k0k */