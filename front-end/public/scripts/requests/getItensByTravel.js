export default function getItensByTravelAndCategory(authorizedHeader, id){
    const url = `http://localhost:3333/itens/viagem/todos/ler?travel_id=${id}`

    const init = { "headers": authorizedHeader,
                   "redirect": "follow" }

    return {"url": url, "init": init}
}