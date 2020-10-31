import itensCards from "./modules/itensCards.js"

const personalClothsBlock = document.querySelector("ul#lista-roupas");
const personalOthersBlock = document.querySelector("ul#lista-outros");
const personalHygieneBlock = document.querySelector("ul#lista-higiene");
const commonItensBlock = document.querySelector("ul#lista-itens-viagem");
const templatePersonalItem = document.querySelector("template#t-item-pessoal");
const templateCommonItem = document.querySelector("template#t-item-comum");

const personalBlocks = [personalHygieneBlock, personalClothsBlock, personalOthersBlock];

const itnc = itensCards();

fetch("/data/itens.json")
    .then(res => res.json())
    .then(json => json.forEach(element => {
      if(element.pessoal){
          
        personalBlocks[element.categoria].appendChild(itnc.buildPersonalCard(templatePersonalItem, element))
      } 
      else{

        commonItensBlock.appendChild(itnc.buildCommonCard(templateCommonItem, element))
      }
}))

