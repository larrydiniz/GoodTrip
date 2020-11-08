import invitationCards from "./modules/invitationCards.js"
import dataParser from "./modules/dataParser.js"

const invitationsBlock = document.querySelector("div.convites-embarque");
const templateInvitationCard = document.querySelector("template#t-convite");

const inttn = invitationCards();
const dtp = dataParser();

// fetch("/data/convites.json")
//     .then(res => res.json())
//     .then(json => {
        
//         if(json.length){

//             json.map(data => inttn.buildCard(templateInvitationCard, dtp.dateParser(data.viagem)))
//                 .forEach(card => invitationsBlock.appendChild(card))
//         }
//     })

fetch("http://localhost:3333/usuarios/ler/1")
    .then(res => res.json())
    .then(json => {
        
        const convites = json.embarques.filter(embarque => !embarque.aceito);

        convites.map(data => inttn.buildCard(templateInvitationCard, dtp.dateParser(data.viagem)))
                .forEach(card => invitationsBlock.appendChild(card))
    })