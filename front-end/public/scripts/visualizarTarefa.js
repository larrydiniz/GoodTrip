import viewTaskCard from "./modules/viewTaskCard.js"
import urlParser from "./modules/urlParser.js"
import gtHeaders from "./requests/gtHeaders.js";

const urlp = urlParser();

const blocoTarefa = document.querySelector('div.tarefa');
const templateTarefa = document.getElementById('t-tarefa-atual');
const linkEdit = document.querySelector('a.btn-editar')
const mappedUrlParams = urlp.mapVariables(location.href);

window.addEventListener('load', () => {

    linkEdit.href += `?travel_id=${mappedUrlParams.travel_id}&task_id=${mappedUrlParams.task_id}`
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