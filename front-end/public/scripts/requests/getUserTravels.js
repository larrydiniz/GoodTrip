export default function getUserTravels(){

    const userId = localStorage.getItem("USER_ID")

    const urls = { "getTravelsWasUserAreMember": `http://localhost:3333/embarques/usuario/ler?id_usuario=${userId}&aceito=true`,
                   "getTravelsBelongsToUser": `http://localhost:3333/viagens/usuario/ler?id_usuario=${userId}&finalizada=false` }

    const headers = { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN"), 
                      "Content-Type": "application/json" }

    const init = { "headers": headers, 
                   "redirect": "follow" }
    
    return { "urls": urls,
             "init": init }
}