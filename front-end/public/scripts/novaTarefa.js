const dia = document.querySelector('div#dia');
const caminho = location.href.split("?")[1];
const diaSelecionado = caminho.split("-")[2];

dia.innerHTML = `${diaSelecionado}`;