export default function updateUserInfos(userId, requestBody){

    const url = `http://localhost:3333/usuarios/editar/${userId}`

    const headers = { "Authorization": "Token " + "JWT by localstorage", 
                      "Content-Type": "application/json" }

    const body = JSON.stringify(requestBody)

    const init = { "headers": headers, 
                   "method": "PUT",
                   "mode": "cors",
                   "body": body, 
                   "redirect": "follow" }


    return { "url": url, "init": init }
} 