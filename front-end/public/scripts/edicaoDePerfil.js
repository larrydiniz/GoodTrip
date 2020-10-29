import imagePreviewer from "./utils/imagePreviewer.js"

const inputImg = document.querySelector('input#edicao_perfil_inputImagem');
const imgPreview = document.querySelector('img#edicao_perfil_img');
									
inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));
