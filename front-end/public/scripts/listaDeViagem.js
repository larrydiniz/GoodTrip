import travelCards from "./modules/travelCards.js"
import dataParser from "./modules/dataParser.js"
import getUserTravels from "./requests/getUserTravels.js"
import gtHeaders from "./requests/gtHeaders.js";

const dtp = dataParser();
const trvc = travelCards();

const travelsBlock = document.querySelector("div.viagens");
const templateTravelCard = document.querySelector("template#t-card-viagem");

window.addEventListener('load', () => {

    const requests = getUserTravels(gtHeaders.authorized())

    const fetchs = [ fetch(requests.urls.getTravelsWasUserAreMember, requests.init), fetch(requests.urls.getTravelsBelongsToUser, requests.init) ]

    Promise.all(fetchs)
           .then(responses => responses.map(res => res.json()))
           .then(promises => Promise.all(promises))
           .then(jsonList => jsonList.reduce((acc, curr) => [...acc, ...curr], []))
           .then(travelslist => Array.isArray(travelslist)? travelslist.map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data))): false)
           .then(cards => cards? cards.forEach(card => travelsBlock.appendChild(card)): travelsBlock.innerText = "Nenhuma viagem")
           .catch(e => console.log(e))
})