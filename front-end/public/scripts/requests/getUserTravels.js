export default function getUserTravels(authorizedHeader){

    const userId = localStorage.getItem("USER_ID")

    const urls = { "getTravelsWasUserAreMember": `http://localhost:3333/embarques/usuario/ler?id_usuario=${userId}&aceito=true`,
                   "getTravelsBelongsToUser": `http://localhost:3333/viagens/usuario/ler?id_usuario=${userId}&finalizada=false` }

    const init = { "headers": authorizedHeader, 
                   "redirect": "follow" }
    
    return { "urls": urls,
             "init": init }
}