export default function getUser(){

    const userId = localStorage.getItem("USER_ID")

    const url = `http://localhost:3333/usuarios/ler/${userId}`

    const headers = { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN"), 
                      "Content-Type": "application/json" }

    const init = { "headers": headers, 
                   "redirect": "follow" }
    
    return { "url": url,
             "init": init }
}