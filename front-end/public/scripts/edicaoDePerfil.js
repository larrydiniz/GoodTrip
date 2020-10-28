
function imagePreviewer({input, previewBox}){
	const imgReader = new FileReader();
	
	return function(){
		
		imgReader.readAsDataURL(input.files[0]);
		
		imgReader.onload = function (imgEvent) {
			previewBox.setAttribute('src', imgEvent.target.result);
		};	
	}
}

/******** MAIN ******/
const inputImg = document.querySelector('input#edicao_perfil_inputImagem');
const imgPreview = document.querySelector('img#edicao_perfil_img');
const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');

inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));
menuButton.addEventListener('click', classToggler({element: navMenu, toggleClass: "show"}));
