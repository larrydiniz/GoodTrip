export default function updateUserInfos(requestBody){

    const userId = localStorage.getItem("USER_ID")

    const url = `http://localhost:3333/usuarios/editar/${userId}`

    const headers = { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN"), 
                      "Content-Type": "application/json" }

    const body = JSON.stringify(requestBody)

    const init = { "headers": headers, 
                   "method": "PUT",
                   "mode": "cors",
                   "body": body, 
                   "redirect": "follow" }


    return { "url": url, "init": init }
} 