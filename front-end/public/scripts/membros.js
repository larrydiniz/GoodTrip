import membersCards from "./modules/membersCards.js"

const membersBlock = document.querySelector("div#membros_usuarios");
const guestsBlock = document.querySelector("div#membros_convidados");
const templateMemberCard = document.querySelector("template#t_membro_card");
const templateGuestCard = document.querySelector("template#t_membro_convidado");

const mmbc = membersCards();

fetch("/data/embarques.json")
    .then(res => res.json())
    .then(json => json.forEach(element => {
        if(element.aceito){

            membersBlock.appendChild(mmbc.buildMemberCard(templateMemberCard, element.usuario))
        }
        else{

            guestsBlock.appendChild(mmbc.buildGuestCard(templateGuestCard, element.usuario))
        }
    }));