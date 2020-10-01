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

/************** Imagem Cadastro-Viagem ************/
function PreviewImage() {
	var imgReader = new FileReader();
	imgReader.readAsDataURL(document.getElementById("carregar-imagem").files[0]);

	imgReader.onload = function (imgEvent) {
		document.getElementById("preview").src = imgEvent.target.result;
	};
};


/***** MAIN *****/

btn.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));
nav.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));
overlay.addEventListener("toggling", classToggler({element: ulNav, toggleClass: "hide"}));

modalMountListeners(loginModal);
modalMountListeners(registerModal);

/*************** Visualizar Senha *****************/
function visualizar(id, cod){

	let campo = document.getElementById(id);

	//botão
	if (cod == '1'){
		var olho = document.querySelector(".olho1");
	} else if (cod == '2') {
		var olho = document.querySelector(".olho2");
	} else {
		var olho = document.querySelector(".olho3");
	}

	//visualização da senha
	if (campo.type == 'password'){
		campo.type = 'text';
		olho.src = "../public/icons/olho-aberto.svg"
	}
	else{
		campo.type = 'password';
		olho.src = "../public/icons/olho-fechado.svg"
	}	
}



/* 
const nav = document.getElementById("nav");
const btn = document.getElementById("dh_menu_btn");

function menu (){
    let show = nav.classList.contains("show");

        if(show == false){
            nav.classList.add("show");
        }else{
            nav.classList.remove("show");
        }
}

btn.addEventListener("click", menu)  */