import invitationCards from "./modules/invitationCards.js"
import dataParser from "./modules/dataParser.js"

const invitationsBlock = document.querySelector("div.convites-embarque");
const templateInvitationCard = document.querySelector("template#t-convite");

const inttn = invitationCards();
const dtp = dataParser();

function buildCard(data){

    const clonedInvitationCard = templateInvitationCard.content.cloneNode(true);
    const mappedInvitationUserInfos = inttn.mapCloneUserInfos(clonedInvitationCard);
    const mappedInvitationTravelInfos = inttn.mapCloneTravelInfos(clonedInvitationCard);
    
    inttn.setCloneUserAttributes(mappedInvitationUserInfos, data.viagem);
    inttn.setCloneTravelAttributes(mappedInvitationTravelInfos, dtp.dateParser(data.viagem));

    return clonedInvitationCard;
}

function appendCard(parent, card){

    parent.appendChild(card);
}

fetch("/data/convites.json").then(res => res.json()).then(json => json.forEach(element => appendCard(invitationsBlock, buildCard(element))))