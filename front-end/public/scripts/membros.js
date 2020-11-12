import membersCards from "./modules/membersCards.js"
import urlParser from "./modules/urlParser.js"

const mmbc = membersCards();
const urlp = urlParser();

const searchInput = document.querySelector("input#membros_busca_amigo");
const searchButton =  document.querySelector("svg#button_search");
const membersBlock = document.querySelector("div#membros_usuarios");
const guestsBlock = document.querySelector("div#membros_convidados");
const inviteBlock = document.querySelector("div#membros_convidar");
const templateMemberCard = document.querySelector("template#t_membro_card");
const templateGuestCard = document.querySelector("template#t_membro_convidado");
const templateInvitedCard = document.querySelector("template#t_membro_busca");
const urlParams = urlp.mapVariables(location.href);

searchButton.addEventListener('click', () => {

        Promise.all([
                        fetch(`http://localhost:3333/usuarios/buscar?q=${searchInput.value}`),
                        fetch(`http://localhost:3333/viagens/ler/${urlParams.travel_id}`)
                ])
                .then(values => ({"usuario": values[0], "viagem": values[1]}))
                .then(objectResponses => Promise.all([objectResponses.usuario.json(), objectResponses.viagem.json()]))
                .then(values => ({"usuario": values[0][0], "viagem": values[1]}))
                .then(json => {

                        console.log(json)
                        
                        const card = mmbc.buildToInviteCard(templateInvitedCard, json)
                            
                        inviteBlock.appendChild(card)
                })
})

window.addEventListener('load', () => {

        fetch(`http://localhost:3333/embarques/viagem/ler?id_viagem=${urlParams.travel_id}&finalizada=false`)
                .then(res => res.json())
                .then(json => {
        
                        const embarques = json.reduce((acc, current) => current.aceito? (acc.aceitos.push(current), acc): (acc.pendentes.push(current), acc), {"aceitos":[], "pendentes":[]})
        
                        embarques.aceitos.map(data => mmbc.buildMemberCard(templateMemberCard, data))
                                         .forEach(card => membersBlock.appendChild(card));
        
                        embarques.pendentes.map(data => mmbc.buildGuestCard(templateGuestCard, data))
                                           .forEach(card => guestsBlock.appendChild(card));
                })
})

window.addEventListener("guestCardCancelButtonClick", e => fetch(`http://localhost:3333/embarques/apagar?id=${e.detail}`, { method: "DELETE", redirect:"follow" }))
window.addEventListener("guestCardInviteButtonClick", e => fetch(`http://localhost:3333/embarques/escrever`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(e.detail), redirect:"follow" }))