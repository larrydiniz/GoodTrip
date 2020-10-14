const nav = document.getElementById("menu");
const btn = document.querySelector(".menu-landing");
const overlay = document.querySelector("div.overlay");
const ulNav = document.querySelector("ul");
const btnMenuLogin = document.querySelector("button#entrar.menu");
const btnMenuRegister = document.querySelector("button#cadastrar.menu");


/****** MODAIS *******/

const loginModal = {
	openButton: btnMenuLogin,
	closeButton: document.querySelector("button.login.fechar"),
	content: document.querySelector("div.login.modal"),
	modalOverlay: overlay,
	visibilityClass: "show"
}

const registerModal = {
	openButton: btnMenuRegister,
	closeButton: document.querySelector("button.cadastro.fechar"),
	content: document.querySelector("div.cadastro.modal"),
	modalOverlay: overlay,
	visibilityClass: "show"
}

function modalMountListeners({openButton, closeButton, content, modalOverlay, visibilityClass}){

	openButton.addEventListener("click", classToggler({element: content, toggleClass: visibilityClass}));
	closeButton.addEventListener("click", classToggler({element: content, toggleClass: visibilityClass}));
	content.addEventListener("toggling", classToggler({element: modalOverlay, toggleClass: visibilityClass}));
}


function classToggler({element, toggleClass}){
	const toggling = new Event('toggling');

	return function(){
		const classList = element.classList

	    if(classList.contains(toggleClass)){
			classList.remove(toggleClass);

	    }
	    else{
	        classList.add(toggleClass);
	    }

	    element.dispatchEvent(toggling);
	}
}

/***** MAIN *****/

btn.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));
nav.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));
overlay.addEventListener("toggling", classToggler({element: ulNav, toggleClass: "hide"}));

modalMountListeners(loginModal);
modalMountListeners(registerModal);
