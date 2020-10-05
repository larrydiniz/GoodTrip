const inputImg = document.querySelector('input#edicao_perfil_inputImagem');
const imgPreview = document.querySelector('img#edicao_perfil_img');

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

inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));
