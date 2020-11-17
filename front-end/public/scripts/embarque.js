import invitationCards from "./modules/invitationCards.js"
import getInvitesOfUser from "./requests/getInvitesOfUser.js"
import dataParser from "./modules/dataParser.js"

const inttn = invitationCards();
const dtp = dataParser();

const invitationsBlock = document.querySelector("div.convites-embarque");
const templateInvitationCard = document.querySelector("template#t-convite");
        
window.addEventListener('load', () => {

    const request = getInvitesOfUser()

    fetch(request.url, request.init)
        .then(res => res.json())
        .then(json => Array.isArray(json)? json.map(data => inttn.buildCard(templateInvitationCard, dtp.dateParser({ ...data, ...data.viagem }))): false)
        .then(cards => cards.length != 0? cards.forEach(card => invitationsBlock.appendChild(card)): invitationsBlock.innerText = "Nenhum convite..")
        .catch(e => console.log(e))
})

window.addEventListener('invitation-click', e => console.log(e.detail));