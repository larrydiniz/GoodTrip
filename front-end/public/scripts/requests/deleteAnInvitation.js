export default function deleteAnInvitation(requestParam){
    const url = `http://localhost:3333/embarques/apagar?id=${requestParam}`

    const headers = { "Authorization": "Token " + "JWT by localstorage", 
                      "Content-Type": "application/json" }

    const init = { "headers": headers, 
                   "method": "DELETE", 
                   "redirect": "follow" }

                   
    return { "url": url,
             "init": init }
}