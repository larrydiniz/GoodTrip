import travelCards from "./modules/travelCards.js"
import dataParser from "./modules/dataParser.js"

const travelsBlock = document.querySelector("div.viagens");
const templateTravelCard = document.querySelector("template#t-card-viagem");

const dtp = dataParser();
const trvc = travelCards();

fetch("/data/viagens.json")
    .then(res => res.json())
    .then(json => {

        if(json.length){

            json.map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data)))
                .forEach(card => travelsBlock.appendChild(card));
        }
        else{

            travelsBlock.innerText = "Sem viagens..."
        }
    })