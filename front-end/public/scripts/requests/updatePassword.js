export default function updatePassword(authorizedHeader, requestBody){

    const userId = localStorage.getItem("USER_ID")

    const url = `http://localhost:3333/usuarios/alterarSenha/${userId}`

    const body = JSON.stringify(requestBody)

    const init = { "headers": authorizedHeader, 
                   "method": "PUT",
                   "mode": "cors",
                   "body": body, 
                   "redirect": "follow" }


    return { "url": url, "init": init }
}