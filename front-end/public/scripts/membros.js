import membersCards from "./modules/membersCards.js"
import urlParser from "./modules/urlParser.js"
import Fork from "./modules/Fork.js"
import Optional from "./modules/Optional.js"
import deleteAnInvitation from "./requests/deleteAnInvitation.js";
import gtHeaders from "./requests/gtHeaders.js";
import postNewMember from "./requests/postNewMember.js";
import swal from 'sweetalert';

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

searchButton.addEventListener('click', function getUserAndTravelToMakeAnInvitation(){
        inviteBlock.innerHTML = "";

        const urls = { "searchUser": `http://localhost:3333/usuarios/buscar?q=${searchInput.value}`,
                       "getTravel": `http://localhost:3333/viagens/ler/${urlParams.travel_id}` }
 
        const init = { "headers": gtHeaders.authorized(), 
                       "redirect": "follow" }
        
        const fetchs = [ fetch(urls.searchUser, init), fetch(urls.getTravel, init) ]

        Promise.all(fetchs)
               .then(responses => responses.map(res => res.json()))
               .then(promises => Promise.all(promises))
               .then(values => ({"usuario": values[0], "viagem": values[1]}))
               .then(json => mmbc.buildToInviteCard(templateInvitedCard, json))
               .then(card => inviteBlock.appendChild(card))
               .then(e => {console.log(e)})
})

window.addEventListener('load', function getActiveTravels(){

        const urlToGetUserMembersOfTravel = `http://localhost:3333/embarques/viagem/ler?id_viagem=${urlParams.travel_id}&finalizada=false`

        const init = { "headers": gtHeaders.authorized(), 
                       "redirect": "follow" }

        fetch(urlToGetUserMembersOfTravel, init)
                .then(res => res.json())
                .then(json => {
                        const fork = Fork.of(json)
                                         .between("aceitos", "pendentes")
                                         .flatReduce(curr => curr.aceito)
 
                        const toAppendMembersCards = Optional.of(fork.aceitos)
                                                             .flatMap(data => mmbc.buildMemberCard(templateMemberCard, data))
                                                             .flatMap(card => membersBlock.appendChild(card))
                                                             .getOrElse(() => membersBlock.innerText = "Nenhum membro")
 
                        const toAppendGuestsCards = Optional.of(fork.pendentes)
                                                            .flatMap(data => mmbc.buildGuestCard(templateGuestCard, data))
                                                            .flatMap(card => guestsBlock.appendChild(card))
                                                            .getOrElse(() => guestsBlock.innerText = "Nenhum convite")
                })
                .catch(e => console.log(e))
})

window.addEventListener("guestCardCancelButtonClick", function cancelInvitation(e){
        swal({
                title: "Deseja cancelar este convite?",
                text: "Você pode realizar esse convite novamente...",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                        const request = deleteAnInvitation(gtHeaders.authorized(), e.detail)

                        fetch(request.url, request.init)
                                .then(res => res.json())
                                .then(res => {
                                        if(res.message !== undefined){
                                                swal (`${res.message}` , { 
                                                        icon: "error",
                                                        buttons : false, 
                                                        timer : 2000 })
                                                .then((value) => window.location.href = `membros.html?travel_id=${urlParams.travel_id}`);
                                        }
                                })
                                
                        swal("Convite Deletado!", {
                        icon: "success",
                        buttons : false,
                        timer : 2000
                        })
                        .then((value) => window.location.href = `membros.html?travel_id=${urlParams.travel_id}`);
                } else {
                        swal("Seu convite continua aguardando aprovação!")
                }
              })      
})

window.addEventListener("guestCardInviteButtonClick", function inviteToTravel(e){

        const request = postNewMember(gtHeaders.authorized(), e.detail)

        fetch(request.url, request.init)
                .then(res => res.json())
                .then(res => {
                        if(res.message !== undefined){
                                swal (`${res.message}` , { 
                                        icon: "error",
                                        buttons : false, 
                                        timer : 2000 })
                                .then((value) => window.location.href = `membros.html?travel_id=${urlParams.travel_id}`);
                        } else {
                                swal ("Convite Realizado!" , { 
                                        icon: "success",
                                        buttons : false, 
                                        timer : 2000 })
                                .then((value) => window.location.href = `membros.html?travel_id=${urlParams.travel_id}`);
                        }
                })
})