export default function postNewtravel(requestBody){

    const url = `http://localhost:3333/viagens/escrever`

    const headers = { "Authorization": "Token " + "JWT by localstorage", 
                      "Content-Type": "application/json" }

    const body = JSON.stringify(requestBody)

    const init = { "headers": headers, 
                   "method": "POST", 
                   "body": body, 
                   "redirect": "follow" }


    return { "url": url, "init": init }
} 