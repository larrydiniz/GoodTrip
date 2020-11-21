export default function postNewMember(authorizedHeader, requestBody){

    const url = `http://localhost:3333/embarques/escrever`

    const body = JSON.stringify(requestBody)

    const init = { "headers": authorizedHeader, 
                   "method": "POST", 
                   "body" : body, 
                   "redirect":"follow" }
    
    return { "url": url,
             "init": init }
}