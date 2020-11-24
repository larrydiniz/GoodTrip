import postNewtravel from "./requests/postNewTravel.js"
import imagePreviewer from "./utils/imagePreviewer.js"
import postUploadTravelImage from "./requests/postUploadTravelImage.js"
import gtHeaders from "./requests/gtHeaders.js"
import Inputs from "./modules/Inputs.js"
import swal from 'sweetalert';

const inputTitle = document.querySelector('input#viagem-destino');
const inputInit = document.querySelector('input#data-inicio');
const inputEnd = document.querySelector('input#data-termino');
const inputImg = document.querySelector('input#carregar-imagem');
const imgPreview = document.querySelector('img#preview');
const sendButton = document.querySelector('button.cadastrar');
const inputsList = [inputTitle, inputInit, inputEnd];
const divErro = document.getElementById('erro');

inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));

sendButton.addEventListener('click', () => {

    const user = { "id": localStorage.getItem("USER_ID") }

    const requestBody = inputsList.reduce(Inputs.reduceByInputName, { "usuario": user, "finalizada": false });

    const request = postNewtravel(gtHeaders.authorized(), requestBody)

    console.log(JSON.stringify(requestBody))

    fetch(request.url, request.init)
        .then(res => res.json())
        .then(json => {
            if(json.message !== undefined){
            divErro.innerHTML = `<p>${json.message}</p>`;
            } else {
                divErro.innerHTML = ``;
                console.log(json)
                const formdata = new FormData();   
                formdata.append("imagem", inputImg.files[0]);
                return postUploadTravelImage(json.id, formdata);
            }
        })
        .then(request => fetch(request.url, request.init)
        .then(json => {
            swal ("Viagem criada com sucesso!" , { 
                icon: "success",
                buttons : false, 
                timer : 2000 })
            .then((value) => window.location.href = "listaDeViagem.html");
        })
        .catch(e => {
            swal ("Erro ao criar viagem. Tente novamente..." , { 
            icon: "error",
            buttons : false, 
            timer : 2000 })
        .then((value) => window.location.href = "cadastro-viagem.html");
        })
        )
        
})