import invitationCards from "./modules/invitationCards.js"
import getInvitesOfUser from "./requests/getInvitesOfUser.js"
import dataParser from "./modules/dataParser.js"
import gtHeaders from "./requests/gtHeaders.js";
import Optional from "./modules/Optional.js"
import swal from 'sweetalert';

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
                                          .flatMap(data => inttn.buildCard(templateInvitationCard, dtp.dateParser({ ...data, ...data.viagem, ...data})))
                                          .getOrElse(() => { throw new Error("Resposta não é uma lista de embarques") })

            const cards = Optional.of(toAppendCards)
                                  .flatMap(card => invitationsBlock.appendChild(card))
                                  .getOrElse(() => invitationsBlock.innerText = "Nenhum convite..")

        })
        .catch(e => console.log(e))
})

window.addEventListener('invitation-click', e => {
    console.log(e.detail)

    let action;

    if(e.detail.action == 'aceitar'){
        action = true;
    } else if (e.detail.action == 'recusar'){
        action = null;
    }

    const urlToPutInvitation = `http://localhost:3333/embarques/aceitar/${e.detail.invitation}`

    console.log(urlToPutInvitation)

    console.log(`{"aceito": "${action}"}`);

    console.log()
    const init = { "headers": gtHeaders.authorized(), 
                    "method": "PUT", 
                    "body": `{"aceito": "${action}"}`,
                    "mode": "cors",
                    "redirect": "follow" }

    fetch(urlToPutInvitation, init)
		.then(res => res.json())
		.then(json => {
			if(json.message !== undefined){
				divErro.innerHTML = `<p>${json.message}</p>`;
			} else {
                if(action == true){
                    console.log("aceitou")
                    swal ("Boa viagem!" , { 
                        icon: "success",
                        buttons : false, 
                        timer : 2000 })
                    .then((value) => window.location.href = "listaDeViagem.html");
                } else {
                    console.log("negou")
                    swal ("Embarque Negado" , { 
                        icon: "error",
                        buttons : false, 
                        timer : 2000 })
                    .then((value) => window.location.href = "listaDeViagem.html");
                    }	
			}
		})

    

});