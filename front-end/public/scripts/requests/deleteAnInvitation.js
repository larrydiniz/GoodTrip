export default function deleteAnInvitation(authorizedHeader, requestParam){
    const url = `http://localhost:3333/embarques/apagar?id=${requestParam}`

    const init = { "headers": authorizedHeader, 
                   "method": "DELETE", 
                   "redirect": "follow" }

                   
    return { "url": url,
             "init": init }
}