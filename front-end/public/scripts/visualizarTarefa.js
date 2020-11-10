import viewTaskCard from "./modules/viewTaskCard.js"
import urlParser from "./modules/urlParser.js"

const urlp = urlParser();

const blocoTarefa = document.querySelector('div.tarefa');
const templateTarefa = document.getElementById('t-tarefa-atual');
const mappedUrlParams = urlp.mapVariables(location.href);

// fetch("/data/tarefas.json")
//     .then(res => res.json())
//     .then(json => {

//         if(json.length){

//             json.filter(data => data.id_tarefa == idTarefa) // Apenas para testes!!!! Remover assim que tivermos backend!!!!!
//                 .map(data => viewTaskCard().buildCard(templateTarefa, data))
//                 .forEach(card => blocoTarefa.appendChild(card))
//         }
//     });
window.addEventListener('load', () => {

    fetch(`http://localhost:3333/tarefas/ler/${mappedUrlParams.task_id}`)
        .then(res => res.json())
        .then(json => {
            const card = viewTaskCard().buildCard(templateTarefa, json);
            blocoTarefa.appendChild(card);
        });
})