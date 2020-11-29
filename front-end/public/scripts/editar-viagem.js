import urlParser from './modules/urlParser.js'
import gtHeaders from './requests/gtHeaders.js';
import Inputs from "./modules/Inputs.js";
import postUploadTravelImage from "./requests/postUploadTravelImage.js";
import imagePreviewer from "./utils/imagePreviewer.js";
import swal from 'sweetalert';

const urlp = urlParser();

const inputTitle = document.getElementById('viagem-destino');
const inputInit = document.getElementById('data-inicio');
const inputEnd = document.getElementById('data-termino');
const inputImg = document.getElementById('carregar-imagem');
const imgPreview = document.getElementById('preview');
const sendButton = document.querySelector('button.cadastrar');
const divErro = document.getElementById('erro');
const inputsList = [inputTitle, inputInit, inputEnd];
const urlParams = urlp.mapVariables(location.href);

window.addEventListener('load', function getTripInfos(){

    const urlToGetTripById = `http://localhost:3333/viagens/ler/${urlParams.travel_id}`
    
    const init = { "headers": gtHeaders.authorized(), 
                    "redirect": "follow" }

    fetch(urlToGetTripById, init)
        .then(res => res.json())
        .then(json => {
            inputTitle.setAttribute('value', json.destino)
            inputInit.setAttribute('value', json.inicio)
            inputEnd.setAttribute('value', json.termino)
            imgPreview.setAttribute('src', json.imagem)

            inputEnd.setAttribute('min', inputInit.value);
        });
})

inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));

sendButton.addEventListener('click', () => {

    const urlToPutTrip = `http://localhost:3333/viagens/editar/${urlParams.travel_id}`

    const requestBody = inputsList.reduce(Inputs.reduceByInputName, {});

    console.log(JSON.stringify(requestBody));

    const init = { "headers": gtHeaders.authorized(), 
                    "method": "PUT", 
                    "body": JSON.stringify(requestBody),
                    "mode": "cors",
                    "redirect": "follow" }

    fetch(urlToPutTrip, init)
        .then(res => res.json())
        .then(json => {
            console.log(json)

            const formdata = new FormData();
            
            formdata.append("imagem", inputImg.files[0]);
            
            return postUploadTravelImage(json.id, formdata);
        })
        .then(json => {
            swal ("Viagem Editada" , { 
                icon: "success",
                buttons : false, 
                timer : 2000 })
            .then((value) => window.location.href = `agenda-viagem.html?travel_id=${urlParams.travel_id}`);
        })
        .catch(e => {
            swal ("Erro ao editar viagem. Tente novamente..." , { 
            icon: "error",
            buttons : false, 
            timer : 2000 })
        .then((value) => window.location.href = `editar-viagem.html?travel_id=${urlParams.travel_id}`);
        })
})
