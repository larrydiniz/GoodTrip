import urlParser from './modules/urlParser.js';
import taskCards from "./modules/taskCards.js"

const dia = document.querySelector('div#dia');
const tarefas = document.querySelector('div.tarefas');
const templateCardTarefas = document.getElementById('t-card-tarefa');

const urlp = urlParser();

const urlParams = urlp.mapVariables(location.href);
const diaSelecionado = urlParams.day.split("-")[2];

dia.innerHTML = `${diaSelecionado}`;

fetch("/data/tarefas.json")
	.then(res => res.json())
	.then(json => {
		
		json.filter(tarefa => tarefa.viagem.id == urlParams.travel_id && urlParams.day === tarefa.data) //Apenas para testes!!!!!!!
			.map(tarefa => taskCards().buildCard(templateCardTarefas, tarefa))
			.forEach(card => tarefas.appendChild(card))   
	})