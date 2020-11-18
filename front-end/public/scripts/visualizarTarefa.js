import viewTaskCard from "./modules/viewTaskCard.js"
import urlParser from "./modules/urlParser.js"
import Opcional from "./modules/Optional.js"

const urlp = urlParser();

const blocoTarefa = document.querySelector('div.tarefa');
const templateTarefa = document.getElementById('t-tarefa-atual');
const mappedUrlParams = urlp.mapVariables(location.href);

window.addEventListener('load', function getTask(){
    
    const urlToGetTaskById = `http://localhost:3333/tarefas/ler/${mappedUrlParams.task_id}`

    const headers = { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN"), 
                      "Content-Type": "application/json" }
    
    const init = { "headers": headers, 
                   "redirect": "follow" }

    fetch(urlToGetTaskById, init)
        .then(res => res.json())
        .then(json => { 

            const card = viewTaskCard().buildCard(templateTarefa, json);
            blocoTarefa.appendChild(card);
        });
})