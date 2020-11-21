export default function postNewtravel(authorizedHeader, requestBody){

    const url = `http://localhost:3333/viagens/escrever`

    const body = JSON.stringify(requestBody)

    const init = { "headers": authorizedHeader,
                   "method": "POST", 
                   "body": body,
                   "mode": "cors",
                   "redirect": "follow" }


    return { "url": url, "init": init }
} 