import membersCards from "./modules/membersCards.js"

const membersBlock = document.querySelector("div#membros_usuarios");
const guestsBlock = document.querySelector("div#membros_convidados");
const templateMemberCard = document.querySelector("template#t_membro_card");
const templateGuestCard = document.querySelector("template#t_membro_convidado");

const mmbc = membersCards();
const urlp = urlParser();

const urlParams = urlp.mapVariables(location.href);

// fetch("/data/embarques.json")
//     .then(res => res.json())
//     .then(json => {

//         if(json.length){

//             json.filter(data => data.aceito)
//                 .map(data => mmbc.buildMemberCard(templateMemberCard, data.usuario))
//                 .forEach(card => membersBlock.appendChild(card));
    
//             json.filter(data => !data.aceito)
//                 .map(data => mmbc.buildGuestCard(templateGuestCard, data.usuario))
//                 .forEach(card => guestsBlock.appendChild(card));        
//         }
//         else{

//             membersBlock.innerHTML = "Não há outros membros..."
//             guestsBlock.innerHTML = "Não há convites..."
//         }
//     })

fetch(`http://localhost:3333/viagens/ler/${urlParams.travel_id}`)
.then(res => res.json())
.then(json => {

        const embarques = json.embarques.reduce((acc, current) => current.aceito? (acc.aceitos.push(current), acc): (acc.pendentes.push(current), acc), {"aceitos":[], "pendentes":[]})

        embarques.aceitos.map(data => mmbc.buildMemberCard(templateMemberCard, data.usuario))
                         .forEach(card => membersBlock.appendChild(card));

        embarques.pendentes.map(data => mmbc.buildGuestCard(templateGuestCard, data.usuario))
                           .forEach(card => guestsBlock.appendChild(card));
})