import viewTaskCard from "./modules/viewTaskCard.js"

const idTarefa = location.href.split("?")[1];

const blocoTarefa = document.querySelector('div.tarefa');
const templateTarefa = document.getElementById('t-tarefa-atual');

fetch("/data/tarefas.json")
    .then(res => res.json())
    .then(json => {

        if(json.length){

            json.filter(data => data.id_tarefa == idTarefa) // Apenas para testes!!!! Remover assim que tivermos backend!!!!!
                .map(data => viewTaskCard().buildCard(templateTarefa, data))
                .forEach(card => blocoTarefa.appendChild(card))
        }
    });