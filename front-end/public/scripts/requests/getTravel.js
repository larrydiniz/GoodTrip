export default function getTravel(authorizedHeader, id){
    const url = `http://localhost:3333/viagens/ler/${id}`

    const init = { "headers": authorizedHeader, 
                   "redirect": "follow" }

    
    return {"url": url, "init": init}
}