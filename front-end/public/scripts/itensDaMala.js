import itensCards from "./modules/itensCards.js"

const personalClothsBlock = document.querySelector("ul#lista-roupas");
const personalOthersBlock = document.querySelector("ul#lista-outros");
const personalHygieneBlock = document.querySelector("ul#lista-higiene");
const commonItensBlock = document.querySelector("ul#lista-itens-viagem");
const templatePersonalItem = document.querySelector("template#t-item-pessoal");
const templateCommonItem = document.querySelector("template#t-item-comum");

const personalBlocks = [personalHygieneBlock, personalClothsBlock, personalOthersBlock];

const itnc = itensCards();

// fetch("/data/itens.json")
//     .then(res => res.json())
//     .then(json => {
      
//       if(json.length){

//         json.filter(data => data.pessoal)
//             .map(data => [data.categoria, itnc.buildPersonalCard(templatePersonalItem, data)])
//             .forEach(tuple => personalBlocks[tuple[0]].appendChild(tuple[1]))
  
//         json.filter(data => !data.pessoal)
//             .map(data => itnc.buildCommonCard(templateCommonItem, data))
//             .forEach(card => commonItensBlock.appendChild(card))
//       }
// })

fetch("http://localhost:3333/viagens/ler/1")
    .then(res => res.json())
    .then(json => {
      
      const itens = json.itens;

      //MUDAR O DEFAULT DE PESSOAL!!!!
      //Falhas devido a erro na filtragem de data.pessoal
      //O controle de pessoal será via input...

      itens.filter(data => data.pessoal)
           .map(data => [data.categoria, itnc.buildPersonalCard(templatePersonalItem, data)])
           .forEach(tuple => personalBlocks[tuple[0]].appendChild(tuple[1]))

      itens.filter(data => !data.pessoal)
           .map(data => itnc.buildCommonCard(templateCommonItem, data))
           .forEach(card => commonItensBlock.appendChild(card))
})
