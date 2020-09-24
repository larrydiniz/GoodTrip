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

function toggleClass(element, toggClass){
	const toggling = new Event('toggling');

	return function(){
		const classList = element.classList

	    if(classList.contains(toggClass)){
	        classList.remove(toggClass);
	    }
	    else{
	        classList.add(toggClass);
	    }

	    element.dispatchEvent(toggling);
	}
}

btn.addEventListener("click", toggleClass(nav, "show"));
nav.addEventListener("click", toggleClass(nav, "show"));

btnMenuLogin.addEventListener("click", toggleClass(divLoginContent, "show"));
btnLoginClose.addEventListener("click", toggleClass(divLoginContent, "show"));
divLoginContent.addEventListener("toggling", toggleClass(overlay, "show"));
divLoginContent.addEventListener("toggling", toggleClass(ulNav, "hide"));

btnMenuRegister.addEventListener("click", toggleClass(divRegisterContent, "show"));
btnRegisterClose.addEventListener("click", toggleClass(divRegisterContent, "show"));
divRegisterContent.addEventListener("toggling", toggleClass(overlay, "show"));
divRegisterContent.addEventListener("toggling", toggleClass(ulNav, "hide"));