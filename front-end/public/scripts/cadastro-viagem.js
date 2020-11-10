import imagePreviewer from "./utils/imagePreviewer.js"

{/* <div id="cadastro-viagem"> <!--  method="post" -->
<input type="text" id="viagem-destino" class="local" name="destino" placeholder="Destino">
<div class="data">
    <label id="texto">Data de início</label>
    <input type="date" id="data-inicio" name="inicio">
</div>
<div class="data">
    <label id="texto">Data de término</label>
    <input type="date" id="data-termino" name="termino">
</div>
<div class="imagem">
    <input type="file" id="carregar-imagem" name="imagem" accept="image/png, image/jpeg" value="">
    <label for="carregar-imagem" id="texto">Carregar imagem
        <img id="preview" width="80px" height="auto">
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.09375 11.2495H5.90625C5.54258 11.2495 5.25 10.9359 5.25 10.5462V5.62363H2.85195C2.36523 5.62363 2.12187 4.99365 2.46641 4.62446L6.62539 0.164819C6.83047 -0.0549397 7.1668 -0.0549397 7.37188 0.164819L11.5336 4.62446C11.8781 4.99365 11.6348 5.62363 11.148 5.62363H8.75V10.5462C8.75 10.9359 8.45742 11.2495 8.09375 11.2495ZM14 11.015V14.2968C14 14.6865 13.7074 15 13.3438 15H0.65625C0.292578 15 0 14.6865 0 14.2968V11.015C0 10.6253 0.292578 10.3118 0.65625 10.3118H4.375V10.5462C4.375 11.4516 5.06133 12.1871 5.90625 12.1871H8.09375C8.93867 12.1871 9.625 11.4516 9.625 10.5462V10.3118H13.3438C13.7074 10.3118 14 10.6253 14 11.015ZM10.6094 13.5935C10.6094 13.2712 10.3633 13.0075 10.0625 13.0075C9.76172 13.0075 9.51562 13.2712 9.51562 13.5935C9.51562 13.9159 9.76172 14.1796 10.0625 14.1796C10.3633 14.1796 10.6094 13.9159 10.6094 13.5935ZM12.3594 13.5935C12.3594 13.2712 12.1133 13.0075 11.8125 13.0075C11.5117 13.0075 11.2656 13.2712 11.2656 13.5935C11.2656 13.9159 11.5117 14.1796 11.8125 14.1796C12.1133 14.1796 12.3594 13.9159 12.3594 13.5935Z" fill="#026F81"/>
        </svg>
    </label>
</div>
</div>

<button class="cadastrar">Cadastrar</button> */}

const inputTitle = document.querySelector('input#viagem-destino');
const inputInit = document.querySelector('input#data-inicio');
const inputEnd = document.querySelector('input#data-termino');
const inputImg = document.querySelector('input#carregar-imagem');
const imgPreview = document.querySelector('img#preview');
const sendButton = document.querySelector('button.cadastrar');

const inputsList = [inputTitle, inputInit, inputEnd, inputImg]

inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));

sendButton.addEventListener('click', () => {

    inputsList.forEach(input => console.log(input));

    const requestBody = inputsList.reduce((acc, currentInput) => Object.defineProperty(acc, currentInput.name, { value: currentInput.value, writable: false }), { "usuario": { "id": 1 }});

    console.log(requestBody);

    fetch(`http://localhost:3333/viagens/editar/2`, { headers: { "Content-Type": "application/json" }, mode: "cors", method: "PUT", body: requestBody })
})