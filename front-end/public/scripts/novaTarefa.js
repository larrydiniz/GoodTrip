import urlParser from './modules/urlParser.js'
import taskCards from "./modules/taskCards.js"
import postNewTask from "./requests/postNewTask.js"
import gtHeaders from './requests/gtHeaders.js';
import getTravelTasks from './requests/getTravelTasks.js';
import Optional from './modules/Optional.js';
import swal from 'sweetalert';

const urlp = urlParser();

const dia = document.querySelector('div#dia');
const tarefas = document.querySelector('div.div-tarefas');
const templateCardTarefas = document.getElementById('t-card-tarefa');
const descriptionInput = document.querySelector('textarea#descricao');
const titleInput = document.querySelector('input#titulo');
const costInput = document.querySelector('input#custo');
const hourInput = document.querySelector('input#hora');
const minInput = document.querySelector('input#min');
const sendButton = document.querySelector('button.btn-salvar');
const radioInputsList = [...document.getElementsByName('moeda'), ...document.getElementsByName('transporte')];
const divErro = document.getElementById('erro');
const inputsList = [minInput, hourInput, titleInput, costInput, descriptionInput];
const urlParams = urlp.mapVariables(location.href);
const diaSelecionado = urlParams.day.split("-")[2];


function addZero(value){
	return value.length < 2? ("0" + value): value;
}

sendButton.addEventListener('click', () => {

	const inputsValues = radioInputsList.filter(radio => radio.checked)
									    .concat(...inputsList)
									    .reduceRight((acc, currentInput, index, array) => index + 5 === array.length? (acc[currentInput.name] += ":" + addZero(currentInput.value), acc): (acc[currentInput.name] = currentInput.value, acc), {})

	const paramsValues = { "data": urlParams.day,
						   "viagem": { "id": Number.parseInt(urlParams.travel_id) },
						   "usuario": { "id": localStorage.getItem("USER_ID") },
						   "finalizada": false }

    const request = postNewTask(gtHeaders.authorized(), {...inputsValues, ...paramsValues})

	fetch(request.url, request.init)
		.then(res => res.json())
		.then(json => {
			if(json.message !== undefined){
				divErro.innerHTML = `<p>${json.message}</p>`;
			} else {
				swal ("Tarefa criada com sucesso!" , { 
					icon: "success",
					buttons : false, 
					timer : 2000 })
				.then((value) => window.location.href = `agenda-viagem.html?travel_id=${urlParams.travel_id}`);
			}
		})
})

window.addEventListener('load', () => {

	dia.innerHTML = `${diaSelecionado}`;

	const request = getTravelTasks(gtHeaders.authorized(), urlParams.day, urlParams.travel_id)

	fetch(request.url, request.init)
		.then(res => res.json())
		.then(json => {
			
			const toAppendTasksCards = Optional.of(json)
											   .filter(json => Array.isArray(json))
											   .flatMap(tarefa => taskCards().buildCard(templateCardTarefas, tarefa))
											   .flatMap(card => tarefas.appendChild(card))
											   .getOrElse(() => { throw new Error("Resposta do não é uma lista de tarefas")})
			
		})
		.catch(e => console.log(e))
})