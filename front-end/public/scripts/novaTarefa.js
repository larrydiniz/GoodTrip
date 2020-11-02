import urlParser from './modules/urlParser.js';
import taskCards from "./modules/taskCards.js"

const dia = document.querySelector('div#dia');
const data = location.href.split("day=")[1];
const diaSelecionado = data.split("-")[2];

const urlp = urlParser();
const travelId = urlp.mapVariables(location.href).travel_id;

const tarefas = document.querySelector('div.tarefas');
const templateCardTarefas = document.getElementById('t-card-tarefa');

dia.innerHTML = `${diaSelecionado}`;

fetch("/data/tarefas.json")
		.then(res => res.json())
		.then(json => json.forEach(element => {

			if(travelId == element.viagem.id){

				if (data === element.data){
					tarefas.appendChild(taskCards().buildCard(templateCardTarefas, element))
				}   
			}
		}))