export default function postNewItem(authorizedHeader, requestBody){
    const url = `http://localhost:3333/itens/escrever`

    const body = JSON.stringify(requestBody)

    const init = { "headers": authorizedHeader,
                   "method": "POST",
                   "mode": "cors",
                   "body": body,
                   "redirect": "follow" }

    return { "url": url, "init": init}
}