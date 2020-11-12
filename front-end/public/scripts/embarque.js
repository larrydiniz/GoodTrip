import invitationCards from "./modules/invitationCards.js"
import dataParser from "./modules/dataParser.js"

const inttn = invitationCards();
const dtp = dataParser();

const invitationsBlock = document.querySelector("div.convites-embarque");
const templateInvitationCard = document.querySelector("template#t-convite");
        
window.addEventListener('load', () => {
    fetch("http://localhost:3333/embarques/usuario/ler?id_usuario=1&aceito=false")
        .then(res => res.json())
        .then(json => {

            json.map(data => inttn.buildCard(templateInvitationCard, dtp.dateParser({ ...data, ...data.viagem })))
                .forEach(card => invitationsBlock.appendChild(card))
        })
})

window.addEventListener('invitation-click', e => console.log(e.detail));