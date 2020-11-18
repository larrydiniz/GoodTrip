export default function getInvitesOfUser(authorizedHeader){

    const userId = localStorage.getItem("USER_ID")

    const url = `http://localhost:3333/embarques/usuario/ler?id_usuario=${userId}&aceito=false`

    const init = { "headers": authorizedHeader, 
                   "redirect": "follow" }
    
    return { "url": url,
             "init": init }
}