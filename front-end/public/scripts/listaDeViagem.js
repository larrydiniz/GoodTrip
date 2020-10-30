import travelCards from "./modules/travelCards.js"
import dataParser from "./modules/dataParser.js"

const travelsBlock = document.querySelector("div.viagens");
const templateTravelCard = document.querySelector("template#t-card-viagem");

const dtp = dataParser();
const trvc = travelCards();

function buildCard(data){

    const clonedTravelCard = templateTravelCard.content.cloneNode(true);
    const mappedTravelCard = trvc.mapCloneTravelCard(clonedTravelCard);
    
    trvc.setCloneCardAttributes(mappedTravelCard, dtp.dateParser(data));

    return clonedTravelCard;
}

function appendCard(parent, card){

    parent.appendChild(card);
}

fetch("/data/viagens.json").then(res => res.json()).then(json => json.forEach(element => appendCard(travelsBlock, buildCard(element))))