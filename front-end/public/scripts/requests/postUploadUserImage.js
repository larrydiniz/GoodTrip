export default function postUploadUserImage(requestBody){

    const userId = localStorage.getItem("USER_ID")

    const url = `http://localhost:3333/usuarios/upload/foto/${userId}`

    const headers = { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN") }

    const body = requestBody

    const init = { "headers": headers,
                   "method": "POST", 
                   "body": body,
                   "redirect": "follow" }


    return { "url": url, "init": init }
}