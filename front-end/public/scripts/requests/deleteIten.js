export default function deleteIten(authorizedHeader, requestParam){
    const url = `http://localhost:3333/itens/apagar?id=${requestParam}`

    const init = { "headers": authorizedHeader, 
                   "method": "DELETE", 
                   "redirect": "follow" }

                   
    return { "url": url,
             "init": init }
}