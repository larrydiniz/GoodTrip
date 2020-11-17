export default function postNewtravel(requestBody){

    const url = `http://localhost:3333/viagens/escrever`

    const headers = { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN"), 
                      "Content-Type": "application/json" }

    const body = JSON.stringify(requestBody)

    const init = { "headers": headers,
                   "method": "POST", 
                   "body": body,
                   "mode": "cors",
                   "redirect": "follow" }


    return { "url": url, "init": init }
} 