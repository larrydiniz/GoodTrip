import imagePreviewer from "./utils/imagePreviewer.js"

const inputDescription = document.querySelector('textarea#edicao_descricao');
const inputUsername = document.querySelector('input#edicao_nome_usuario');
const inputName = document.querySelector('input#edicao_nome_perfil');
const inputImg = document.querySelector('input#edicao_perfil_inputImagem');
const imgPreview = document.querySelector('img#edicao_perfil_img');
const sendButton = document.querySelector('button#edicao_salvar');

const inputsList = [inputName, inputUsername, inputImg, inputDescription];
									
inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));

sendButton.addEventListener('click', () => {

    const requestBody = inputsList.reduce((acc, currentInput) => { acc[currentInput.name] = currentInput.value; return acc }, {});

    fetch(`http://localhost:3333/usuarios/editar/1`, { headers: { "Content-Type": "application/json" }, mode: "cors", method: "PUT", body: JSON.stringify(requestBody), redirect: "follow" })
})
