export default function postNewUser(commomHeader, requestBody){

    const url = `http://localhost:3333/usuarios/escrever`

    const body = JSON.stringify(requestBody)

    const init = { "headers": commomHeader,
                   "method": "POST", 
                   "body": body,
                   "mode": "cors",
                   "redirect": "follow" }


    return { "url": url, "init": init }
} 