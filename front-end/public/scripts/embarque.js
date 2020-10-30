import invitationCards from "./modules/invitationCards.js"
import dataParser from "./modules/dataParser.js"

const invitationsBlock = document.querySelector("div.convites-embarque");
const templateInvitationCard = document.querySelector("template#t-convite");

const inttn = invitationCards();
const dtp = dataParser();

fetch("/data/convites.json")
    .then(res => res.json())
    .then(json => json.forEach(element => invitationsBlock.appendChild(inttn.buildCard(templateInvitationCard, dtp.dateParser(element.viagem)))))