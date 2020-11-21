export default function editItem(authorisedHeader, id, requestBody){

    const url = `http://localhost:3333/itens/editar/${id}`

    const body = JSON.stringify(requestBody)

    const init = { "headers": authorisedHeader, 
                   "method": "PUT",
                   "mode": "cors",
                   "body": body, 
                   "redirect": "follow" }


    return { "url": url, "init": init }
} 