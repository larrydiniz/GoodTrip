export default function gettravelTasks(travelId){

    const url = `http://localhost:3333/tarefas/viagem/ler?id_viagem=${travelId}&finalizada=false`

    const headers = { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN"), 
                      "Content-Type": "application/json" }

    const init = { "headers": headers, 
                   "redirect": "follow" }
    
    return { "url": url,
             "init": init }
}