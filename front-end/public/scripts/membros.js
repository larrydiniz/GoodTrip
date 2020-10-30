import membersCards from "./modules/membersCards.js"

const membersBlock = document.querySelector("div#membros_usuarios");
const guestsBlock = document.querySelector("div#membros_convidados");
const templateMemberCard = document.querySelector("template#t_membro_card");
const templateGuestCard = document.querySelector("template#t_membro_convidado");

const mmbc = membersCards();

function buildCard(data){

    if(data.aceito){
    
        const clonedMemberCard = templateMemberCard.content.cloneNode(true);
        const mappedMemberCard = mmbc.mapCloneMemberCard(clonedMemberCard);
    
        mmbc.setCloneCardAttributes(mappedMemberCard, data.usuario);
    
        return { "parent": membersBlock, "card": clonedMemberCard }
    }
    else{
    
        const clonedGuestWrap = templateGuestCard.content.cloneNode(true);
        const mappedGuestCard = mmbc.mapCloneGuestCard(clonedGuestWrap);
    
        mmbc.setCloneCardAttributes(mappedGuestCard, data.usuario);
    
        return { "parent": guestsBlock, "card": clonedGuestWrap };
    }
}

function appendCard({ parent, card }){

    parent.appendChild(card);
}

fetch("/data/embarques.json").then(res => res.json()).then(json => json.forEach(element => appendCard(buildCard(element))));