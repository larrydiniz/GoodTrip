export default function postUploadtravelImage(requestBody){

    const url = `http://localhost:3333/viagens/upload/imagem/4`

    const headers = { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN") }

    const body = requestBody

    const init = { "headers": headers,
                   "method": "POST", 
                   "body": body,
                   "redirect": "follow" }


    return { "url": url, "init": init }
}