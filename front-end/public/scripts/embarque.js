import invitationCards from "./modules/invitationCards.js"
import getInvitesOfUser from "./requests/getInvitesOfUser.js"
import dataParser from "./modules/dataParser.js"
import gtHeaders from "./requests/gtHeaders.js";
import Optional from "./modules/Optional.js"

const inttn = invitationCards();
const dtp = dataParser();

const invitationsBlock = document.querySelector("div.convites-embarque");
const templateInvitationCard = document.querySelector("template#t-convite");
        
window.addEventListener('load', () => {

    const request = getInvitesOfUser(gtHeaders.authorized())

    fetch(request.url, request.init)
        .then(res => res.json())
        .then(json => {

            const toAppendCards = Optional.of(json)
                                          .filter(json => Array.isArray(json))
                                          .flatMap(data => inttn.buildCard(templateInvitationCard, dtp.dateParser({ ...data, ...data.viagem })))
                                          .getOrElse(() => { throw new Error("Resposta não é uma lista de embarques") })

            const cards = Optional.of(toAppendCards)
                                  .flatMap(card => invitationsBlock.appendChild(card))
                                  .getOrElse(() => invitationsBlock.innerText = "Nenhum convite..")

        })
        .catch(e => console.log(e))
})

window.addEventListener('invitation-click', e => console.log(e.detail));