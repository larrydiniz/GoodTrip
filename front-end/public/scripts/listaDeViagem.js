import travelCards from "./modules/travelCards.js"
import dataParser from "./modules/dataParser.js"

const dtp = dataParser();
const trvc = travelCards();

const travelsBlock = document.querySelector("div.viagens");
const templateTravelCard = document.querySelector("template#t-card-viagem");

window.addEventListener('load', () => {

    fetch("http://localhost:3333/usuarios/ler/1")
        .then(res => res.json())
        .then(json => {
    
            json.embarques.filter(embarque => embarque.aceito)
                          .map(embarque => embarque.viagem)
                          .concat(...json.viagens)
                          .map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data)))
                          .forEach(card => travelsBlock.appendChild(card));
        })
})