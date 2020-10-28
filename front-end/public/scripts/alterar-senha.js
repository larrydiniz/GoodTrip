const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');


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

/******** MAIN ******/
menuButton.addEventListener('click', classToggler({element: navMenu, toggleClass: "show"}));