import viewTaskCard from "./modules/viewTaskCard.js"
import urlParser from "./modules/urlParser.js"
import gtHeaders from "./requests/gtHeaders.js";
import taskCards from "./modules/taskCards.js"
import getTravelTasks from './requests/getTravelTasks.js';
import Optional from './modules/Optional.js';
import swal from 'sweetalert';

const urlp = urlParser();

const blocoTarefa = document.querySelector('div.tarefa');
const templateTarefa = document.getElementById('t-tarefa-atual');
const tarefas = document.querySelector('div.div-tarefas');
const templateCardTarefas = document.getElementById('t-card-tarefa');
const linkEdit = document.querySelector('a.btn-editar')
const deleteBtn = document.getElementById('excluir-tarefa');
const mappedUrlParams = urlp.mapVariables(location.href);


window.addEventListener('load', () => {

    linkEdit.href += `?travel_id=${mappedUrlParams.travel_id}&task_id=${mappedUrlParams.task_id}&day=${mappedUrlParams.day}`
})

window.addEventListener('load', function getTask(){
    
    const urlToGetTaskById = `http://localhost:3333/tarefas/ler/${mappedUrlParams.task_id}`
    
    const init = { "headers": gtHeaders.authorized(), 
                   "redirect": "follow" }

    fetch(urlToGetTaskById, init)
        .then(res => res.json())
        .then(json => { 

            const card = viewTaskCard().buildCard(templateTarefa, json);
            blocoTarefa.appendChild(card);
        });
})

window.addEventListener('load', () => {

	const request = getTravelTasks(gtHeaders.authorized(), mappedUrlParams.day, mappedUrlParams.travel_id)

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

deleteBtn.addEventListener('click', () => {
	swal({
		title: "Deseja apagar essa tarefa?",
		text: "Você não poderá restaura-la após apagar...",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		if (willDelete) {
			const urlToDeleteTask = `http://localhost:3333/tarefas/apagar?id=${mappedUrlParams.task_id}`
			   
			const init = { "headers": gtHeaders.authorized(), 
						   "method": "DELETE", 
						   "mode": "cors",
						   "redirect": "follow"}
		
			fetch(urlToDeleteTask, init)
				.then(res => res.json())
				.catch(e => console.log(e))
						
				swal("Tarefa Deletada!", {
				icon: "success",
				buttons : false,
				timer : 2000
				})
				.then((value) => window.location.href = `agenda-viagem.html?travel_id=${mappedUrlParams.travel_id}`);
		}else{
			document.location.reload(true);
		}
	  })     
})