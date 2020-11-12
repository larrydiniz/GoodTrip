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

    const requestBody = inputsList.reduce((acc, currentInput) => (acc[currentInput.name] = currentInput.value, acc ), { "usuario": { "id": 1 } });

    fetch(`http://localhost:3333/viagens/escrever`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(requestBody), redirect: "follow"})
})