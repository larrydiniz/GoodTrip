
function imagePreviewer({input, previewBox}){
	const imgReader = new FileReader();
	
	return function(){
		
		imgReader.readAsDataURL(input.files[0]);
		
		imgReader.onload = function (imgEvent) {
			previewBox.setAttribute('src', imgEvent.target.result);
		};	
	}
}

function classToggler({element, toggleClass}){
	
	return function(){
		const classList = element.classList
		
	    if(classList.contains(toggleClass)){
			classList.remove(toggleClass);
			
	    }
	    else{
			classList.add(toggleClass);
	    }
		
	    element.dispatchEvent(new Event("toggling"));
	}
}

/******** MAIN ******/
const inputImg = document.querySelector('input#edicao_perfil_inputImagem');
const imgPreview = document.querySelector('img#edicao_perfil_img');
const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');

inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));
menuButton.addEventListener('click', classToggler({element: navMenu, toggleClass: "show"}));
