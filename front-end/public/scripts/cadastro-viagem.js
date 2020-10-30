import imagePreviewer from "./utils/imagePreviewer.js"

const inputImg = document.querySelector('input#carregar-imagem');
const imgPreview = document.querySelector('img#preview');


inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));