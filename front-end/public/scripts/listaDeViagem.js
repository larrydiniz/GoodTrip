import travelCards from "./modules/travelCards.js"

const travelsBlock = document.querySelector("div.viagens");
const templateTravelCard = document.querySelector("template#t-card-viagem");

const trvc = travelCards();

function appendCards(element){

    const clonedTravelCard = templateTravelCard.content.cloneNode(true);
    const mappedTravelCard = trvc.mapCloneTravelCard(clonedTravelCard);

    trvc.setCloneCardAttributes(mappedTravelCard, element);

    travelsBlock.appendChild(clonedTravelCard);
}

fetch("/data/viagens.json").then(res => res.json()).then(json => json.forEach(appendCards))