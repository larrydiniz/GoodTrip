const dia = document.querySelector('div#dia');
const data = location.href.split("?")[1];
const diaSelecionado = data.split("-")[2];

dia.innerHTML = `${diaSelecionado}`;