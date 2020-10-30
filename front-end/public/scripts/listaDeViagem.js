import travelCards from "./modules/travelCards.js"
import dataParser from "./modules/dataParser.js"

const travelsBlock = document.querySelector("div.viagens");
const templateTravelCard = document.querySelector("template#t-card-viagem");

const dtp = dataParser();
const trvc = travelCards();

fetch("/data/viagens.json")
    .then(res => res.json())
    .then(json => json.forEach(element => travelsBlock.appendChild(trvc.buildCard(templateTravelCard, dtp.dateParser(element)))))