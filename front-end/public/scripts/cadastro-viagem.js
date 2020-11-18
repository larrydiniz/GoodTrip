import postNewtravel from "./requests/postNewTravel.js"
import imagePreviewer from "./utils/imagePreviewer.js"
import postUploadTravelImage from "./requests/postUploadTravelImage.js"
import gtHeaders from "./requests/gtHeaders.js"

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

    const request = postNewtravel(gtHeaders.authorized(), requestBody)

    fetch(request.url, request.init)
        .then(res => res.json())
        .then(json => {

            const formdata = new FormData();
            
            formdata.append("imagem", inputImg.files[0]);
            
            return postUploadTravelImage(json.id, formdata);

        })
        .then(request => fetch(request.url, request.init))
        .catch(e => console.log(e))
})