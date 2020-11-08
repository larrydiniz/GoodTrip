import travelCards from "./modules/travelCards.js"
import dataParser from "./modules/dataParser.js"

const travelsBlock = document.querySelector("div.viagens");
const templateTravelCard = document.querySelector("template#t-card-viagem");

const dtp = dataParser();
const trvc = travelCards();

// fetch("/data/viagens.json")
//     .then(res => res.json())
//     .then(json => {

//         if(json.length){

//             json.map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data)))
//                 .forEach(card => travelsBlock.appendChild(card));
//         }
//         else{

//             travelsBlock.innerText = "Sem viagens..."
//         }
//     })

fetch("http://localhost:3333/usuarios/ler/1")
    .then(res => res.json())
    .then(json => {

        const embarques = json.embarques.filter(embarque => embarque.aceito)
                                        .map(embarque => embarque.viagem);
                                        
        const viagens = [...json.viagens, ...embarques];

        viagens.map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data)))
               .forEach(card => travelsBlock.appendChild(card));
    })