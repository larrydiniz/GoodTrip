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


/************** Visualizador de Imagem ************/
function PreviewImage() {
	var imgReader = new FileReader();
	imgReader.readAsDataURL(document.getElementById("carregar-imagem").files[0]);

	imgReader.onload = function (imgEvent) {
		document.getElementById("preview").src = imgEvent.target.result;
	};
};


/******** MAIN ******/
menuButton.addEventListener('click', classToggler({element: navMenu, toggleClass: "show"}));