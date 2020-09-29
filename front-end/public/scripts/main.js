/************** Menu Overlay ************/
const nav = document.getElementById("menu");
const btn = document.querySelector(".menu-landing");
const btnMenuLogin = document.querySelector("button#entrar.menu");
const btnMenuRegister = document.querySelector("button#cadastrar.menu");
const divLoginContent = document.querySelector("div.login.modal");
const divRegisterContent = document.querySelector("div.cadastro.modal");
const btnLoginClose = document.querySelector("button.login.fechar");
const btnRegisterClose = document.querySelector("button.cadastro.fechar");
const ulNav = document.querySelector("ul");
const overlay = document.querySelector("div.overlay");

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

btn.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));
nav.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));
overlay.addEventListener("toggling", classToggler({element: ulNav, toggleClass: "hide"}));

btnMenuLogin.addEventListener("click", classToggler({element: divLoginContent, toggleClass: "show"}));
btnLoginClose.addEventListener("click", classToggler({element: divLoginContent, toggleClass: "show"}));
divLoginContent.addEventListener("toggling", classToggler({element: overlay, toggleClass: "show"}));

btnMenuRegister.addEventListener("click", classToggler({element: divRegisterContent, toggleClass: "show"}));
btnRegisterClose.addEventListener("click", classToggler({element: divRegisterContent, toggleClass: "show"}));
divRegisterContent.addEventListener("toggling", classToggler({element: overlay, toogleClass: "show"}));

/************** Imagem Cadastro-Viagem ************/
function PreviewImage() {
	var imgReader = new FileReader();
	imgReader.readAsDataURL(document.getElementById("carregar-imagem").files[0]);

	imgReader.onload = function (imgEvent) {
		document.getElementById("preview").src = imgEvent.target.result;
	};
};


