/* 
<div class="convites-embarque">
    <!-- Lista de convites adicionados dinamicamente -->
</div>
<template id="t-convite">
<div class="convite">
    <div class="user">
        <div class="user-img">
            <img src="" alt="" srcset="">
        </div>
        <div class="user-convite-perfil">
            <div id="convite-username">
                <!-- Nome adicionado dinamicamente -->>
            </div>
            <div id="convite-nickname">
                <!-- User adicionado dinamicamente -->
            </div>
        </div>
    </div>
    <div class="convite-conteudo">
        <div class="convite-destino">
            <p>
                <!-- Titulo de viagem adicionado dinamicamente -->
            </p>
            <p>
                <!-- Data de viagem adicionada dinamicamente-->
            </p>
        </div>
        <div class="convite-opcoes">
            <div class="convite-aceitar">
                <p>
                    <span class="desktop-aceitar"> Embarcar </span>
                    <span class="mobile-aceitar"> <img src="../public/icons/certo.jpg"> </span>
                </p>
            </div>
            <div class="convite-recusar">
                <p>
                    <span class="desktop-aceitar"> Recusar </span>
                    <span class="mobile-aceitar"> <img src="../public/icons/recusar.jpg"> </span>
                </p>
            </div>
        </div>
    </div>
</div>
</template> */
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