import travelCards from "./modules/travelCards.js"
import dataParser from "./modules/dataParser.js"

const dtp = dataParser();
const trvc = travelCards();

const travelsBlock = document.querySelector("div.viagens");
const templateTravelCard = document.querySelector("template#t-card-viagem");

window.addEventListener('load', () => {

    Promise.all([
        fetch("http://localhost:3333/embarques/usuario/ler?id_usuario=1&aceito=true"),
        fetch("http://localhost:3333/viagens/usuario/ler?id_usuario=1&finalizada=false")
    ])
    .then(values => Promise.all(values.map(res => res.json())))
    .then(dataList => dataList.reduce((acc,curr) => [...acc, ...curr], []))
    .then(travelslist => {

        travelslist.map(data => trvc.buildCard(templateTravelCard, dtp.dateParser(data)))
                   .forEach(card => travelsBlock.appendChild(card));
    })
})