import postNewtravel from "./requests/postNewTravel.js";
import imagePreviewer from "./utils/imagePreviewer.js"
import postUploadTravelImage from "./requests/postUploadTravelImage.js"

const inputTitle = document.querySelector('input#viagem-destino');
const inputInit = document.querySelector('input#data-inicio');
const inputEnd = document.querySelector('input#data-termino');
const inputImg = document.querySelector('input#carregar-imagem');
const imgPreview = document.querySelector('img#preview');
const sendButton = document.querySelector('button.cadastrar');
const inputsList = [inputTitle, inputInit, inputEnd];

inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));

sendButton.addEventListener('click', () => {

    const user = { "id": localStorage.getItem("USER_ID") }

    const requestBody = inputsList.reduce((acc, currentInput) => (acc[currentInput.name] = currentInput.value, acc ), { "usuario": user, "finalizada": false });

    const request = postNewtravel(requestBody)

    fetch(request.url, request.init)
})

sendButton.addEventListener('click', () => {

    const formdata = new FormData();

    formdata.append("imagem", inputImg.files[0]);

    const requestBody = formdata;

    const request = postUploadTravelImage(requestBody)

    fetch(request.url, request.init)
})