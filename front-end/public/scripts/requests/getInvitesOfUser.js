export default function getInvitesOfUser(){

    const userId = localStorage.getItem("USER_ID")

    const url = `http://localhost:3333/embarques/usuario/ler?id_usuario=${userId}&aceito=false`

    const headers = { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN"), 
                      "Content-Type": "application/json" }

    const init = { "headers": headers, 
                   "redirect": "follow" }
    
    return { "url": url,
             "init": init }
}