import travelCards from "./modules/travelCards.js"
import dataParser from "./modules/dataParser.js"
import getUserTravels from "./requests/getUserTravels.js"
import travelCardsMember from "./modules/travelCardsMember.js"
import gtHeaders from "./requests/gtHeaders.js";

const dtp = dataParser();
const trvc = travelCards();
const trvcm = travelCardsMember();

const travelsBlock = document.querySelector("div.viagens");
const templateTravelCard = document.querySelector("template#t-card-viagem");
const searchBar = document.querySelector('input.pesquisar');

window.addEventListener('load', () => {

    const requests = getUserTravels(gtHeaders.authorized())

    //const fetchs = [fetch(requests.urls.getTravelsWasUserAreMember, requests.init), fetch(requests.urls.getTravelsBelongsToUser, requests.init) ]
    
    fetch(requests.urls.getTravelsWasUserAreMember, requests.init)
        .then(res => res.json())
        .then(json => Array.isArray(json)? json.map(data => trvcm.buildCard(templateTravelCard, data)): false)
        .then(cards => cards? cards.forEach(card => travelsBlock.appendChild(card)): travelsBlock.innerText = "Nenhuma viagem")
        .catch(e => console.log(e))

    fetch(requests.urls.getTravelsBelongsToUser, requests.init)
        .then(res => res.json())
        .then(json => Array.isArray(json)? json.map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data))): false)
        .then(cards => cards? cards.forEach(card => travelsBlock.appendChild(card)): travelsBlock.innerText = "Nenhuma viagem")
        .catch(e => console.log(e))

    /* Promise.all(fetchs)
           .then(responses => responses.map(res => res.json()))
           .then(promises => Promise.all(promises))
           .then(responses => responses.reduce((acc, curr) => [...acc, ...curr], []))
           .then(travelslist => travelslist.length > 0? travelslist.map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data))): false)
           .then(cards => cards? cards.forEach(card => travelsBlock.appendChild(card)): travelsBlock.innerText = "Nenhuma viagem")
           .catch(e => console.log(e)) */
})

searchBar.addEventListener('blur', () => {

    travelsBlock.innerHTML = "";

    const userid = localStorage.getItem("USER_ID");

    const init = { "headers": gtHeaders.authorized(), 
                   "redirect": "follow" }

    const urlToSearchTravel = `http://localhost:3333/viagens/buscar?q=${searchBar.value}&user_id=${userid}`
    const urlToSearchTravelMember = `http://localhost:3333/viagens/buscarEmbarque?q=${searchBar.value}&user_id=${userid}`


    fetch(urlToSearchTravelMember, init)
        .then(res => res.json())
        .then(json => Array.isArray(json)? json.map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data))): false)
        .then(cards => cards? cards.forEach(card => travelsBlock.appendChild(card)): travelsBlock.innerText = "Nenhuma viagem")
        .catch(e => console.log(e))

    fetch(urlToSearchTravel, init)
           .then(res => res.json())
           .then(json => Array.isArray(json)? json.map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data))): false)
           .then(cards => cards? cards.forEach(card => travelsBlock.appendChild(card)): travelsBlock.innerText = "Nenhuma viagem")
           .catch(e => console.log(e))
   
})