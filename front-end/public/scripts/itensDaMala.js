import itensCards from "./modules/itensCards.js"
import urlParser from "./modules/urlParser.js"
import getItensByTravel from "./requests/getItensByTravel.js"
import gtHeaders from "./requests/gtHeaders.js"
import postNewItem from "./requests/postNewItem.js"
import editItem from "./requests/editItem.js"
import Optional from "./modules/Optional.js"
import Fork from "./modules/Fork.js"

const itnc = itensCards();
const urlp = urlParser();

const categoryItemEnumerable = { "HYGIENE": 0,
                                 "CLOTHS":  1,
                                 "OTHERS":  2,
                                 "COMMOM":  3 }

const personalClothsBlock = document.querySelector("ul#lista-roupas");
const personalOthersBlock = document.querySelector("ul#lista-outros");
const personalHygieneBlock = document.querySelector("ul#lista-higiene");
const commonItensBlock = document.querySelector("ul#lista-itens-viagem");
const templatePersonalItem = document.querySelector("template#t-item-pessoal");
const templateCommonItem = document.querySelector("template#t-item-comum");
const addButtons = [...document.getElementsByClassName("add-btn")];
const personalBlocks = [personalHygieneBlock, personalClothsBlock, personalOthersBlock];
const urlParams = urlp.mapVariables(location.href);

window.addEventListener('load', () => {

  const request = getItensByTravel(gtHeaders.authorized(), urlParams.travel_id)

  fetch(request.url, request.init)
    .then(res => res.json())
    .then(json => {

      const fork = Fork.of(json)
                       .between("pessoais", "comuns")
                       .flatReduce(curr => curr.pessoal)

      const toAppendPersonalTuples = Optional.of(fork.pessoais)
                                            .flatMap(data => [data.categoria, itnc.buildPersonalCard(templatePersonalItem, data)])
                                            .getOrElse(() => { throw new Error("Erro no fork de itens pessoais") })

      const toAppendCommomCards = Optional.of(fork.comuns)
                                          .flatMap(data => itnc.buildCommonCard(templateCommonItem, data))
                                          .getOrElse(() => { throw new Error("erro no fork de itens comuns")})

      toAppendPersonalTuples.forEach(tuple => personalBlocks[tuple[0]].appendChild(tuple[1]))

      toAppendCommomCards.forEach(card => commonItensBlock.appendChild(card))

    })
    .then(() => window.dispatchEvent(new Event('checkboxesAreMounted')))
})

window.addEventListener('load', () => {
  addButtons.forEach(button => {
    button.onclick = function(){

      const parent = this.parentElement

      const body = { "usuario": { "id": localStorage.getItem("USER_ID") },
                     "viagem": { "id": urlParams.travel_id},
                     "nome": parent.children.nome.value,
                     "categoria": parent.children.categoria.value,
                     "pessoal": parent.children.pessoal.value,
                     "checado": false,
                     "ativo": true }

      window.dispatchEvent(new CustomEvent('postNewItem', { detail: body }))
    }
  })
})

window.addEventListener('postNewItem', (e) => {
  const request = postNewItem(gtHeaders.authorized(), e.detail)
  
  fetch(request.url, request.init)
    .then(() => window.location.reload())
    .catch(e => console.log(e))

})

window.addEventListener('checkboxChangeValue', (e) => {
  const request = editItem(gtHeaders.authorized(), e.detail.id, e.detail.body)

  fetch(request.url, request.init)
    .catch(e => console.log(e))
})
