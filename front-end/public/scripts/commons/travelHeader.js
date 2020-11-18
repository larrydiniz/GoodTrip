import dataParser from "../modules/dataParser.js"
import urlParser from "../modules/urlParser.js"
import getTravel from "../requests/getTravel.js";
import gtHeaders from "../requests/gtHeaders.js";

const dtp = dataParser();
const urlp = urlParser();

const travelTitleField = document.querySelector("div.destino-viagem");
const travelDateField = document.querySelector("div.data-viagem");
const travelImageField = document.querySelector("img.imagem-viagem");
const travelId = urlp.mapVariables(location.href).travel_id;

function setTravelHeaderAttributes(nameField, dateField, imageField,data){

    imageField.src = data.imagem;
    nameField.innerText = data.destino;
    dateField.innerText = data.month + "\n" + data.year;
}
window.addEventListener('load', () => {

    const request = getTravel(gtHeaders.authorized(), travelId)

    fetch(request.url, request.init)
        .then(res => res.json())
        .then(json => setTravelHeaderAttributes(travelTitleField, travelDateField, travelImageField, dtp.dateParser(json)))
})