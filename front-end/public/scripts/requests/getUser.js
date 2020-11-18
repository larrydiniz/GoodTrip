export default function getUser(authorizedHeader){

    const userId = localStorage.getItem("USER_ID")

    const url = `http://localhost:3333/usuarios/ler/${userId}`

    const init = { "headers": authorizedHeader, 
                   "redirect": "follow" }
    
    return { "url": url,
             "init": init }
}