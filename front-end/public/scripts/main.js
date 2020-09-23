/************** Menu Overlay ************/
const nav = document.getElementById("menu");
const btn = document.querySelector(".menu-landing");
const btnMenuLogin = document.querySelector("button#entrar.menu");
const divLoginContent = document.querySelector("div.login.conteudo");
const btnLoginClose = document.querySelector("button.login.fechar");

function toggleClass(element, toggClass){

	return function(){
		const classList = element.classList

	    if(classList.contains(toggClass)){
	        classList.remove(toggClass);
	    }
	    else{
	        classList.add(toggClass);
	    }
	}
}

btn.addEventListener("click", toggleClass(nav, "show"));
nav.addEventListener("click", toggleClass(nav, "show"));
btnMenuLogin.addEventListener("click", toggleClass(divLoginContent, "show"));
btnLoginClose.addEventListener("click", toggleClass(divLoginContent, "show"));