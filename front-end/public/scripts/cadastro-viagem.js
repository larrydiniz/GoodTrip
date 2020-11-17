import postNewtravel from "./requests/postNewTravel.js";
import imagePreviewer from "./utils/imagePreviewer.js"

const inputTitle = document.querySelector('input#viagem-destino');
const inputInit = document.querySelector('input#data-inicio');
const inputEnd = document.querySelector('input#data-termino');
const inputImg = document.querySelector('input#carregar-imagem');
const imgPreview = document.querySelector('img#preview');
const sendButton = document.querySelector('button.cadastrar');
const inputsList = [inputTitle, inputInit, inputEnd, inputImg];

inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));

sendButton.addEventListener('click', () => {

    const requestBody = inputsList.reduce((acc, currentInput) => (acc[currentInput.name] = currentInput.value, acc ), { "usuario": { "id": localStorage.getItem("USER_ID") } });

    const request = postNewtravel(requestBody)

    fetch(request.url, request.init)
})