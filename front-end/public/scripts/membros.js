import membersCards from "./modules/membersCards.js"

const membersBlock = document.querySelector("div#membros_usuarios");
const guestsBlock = document.querySelector("div#membros_convidados");
const templateMemberCard = document.querySelector("template#t_membro_card");
const templateGuestCard = document.querySelector("template#t_membro_convidado");

const mmbc = membersCards();

fetch("/data/embarques.json")
    .then(res => res.json())
    .then(json => {

        if(json.length){

            json.filter(data => data.aceito)
                .map(data => mmbc.buildMemberCard(templateMemberCard, data.usuario))
                .forEach(card => membersBlock.appendChild(card));
    
            json.filter(data => !data.aceito)
                .map(data => mmbc.buildGuestCard(templateGuestCard, data.usuario))
                .forEach(card => guestsBlock.appendChild(card));        
        }
        else{

            membersBlock.innerHTML = "Não há outros membros..."
            guestsBlock.innerHTML = "Não há convites..."
        }
    })