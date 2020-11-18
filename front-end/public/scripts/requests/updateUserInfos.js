export default function updateUserInfos(authorisedHeader, requestBody){

    const userId = localStorage.getItem("USER_ID")

    const url = `http://localhost:3333/usuarios/editar/${userId}`

    const body = JSON.stringify(requestBody)

    const init = { "headers": authorisedHeader, 
                   "method": "PUT",
                   "mode": "cors",
                   "body": body, 
                   "redirect": "follow" }


    return { "url": url, "init": init }
} 