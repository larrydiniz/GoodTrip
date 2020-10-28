/************** Visualizador de Imagem ************/
function PreviewImage() {
	var imgReader = new FileReader();
	imgReader.readAsDataURL(document.getElementById("carregar-imagem").files[0]);
	
	imgReader.onload = function (imgEvent) {
		document.getElementById("preview").src = imgEvent.target.result;
	};
};


/******** MAIN ******/
const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');

menuButton.addEventListener('click', classToggler({element: navMenu, toggleClass: "show"}));