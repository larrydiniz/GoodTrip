export default function gettravelTasks(authorizedHeader, id){

    const url = `http://localhost:3333/tarefas/viagem/ler?id_viagem=${id}&finalizada=false`

    const init = { "headers": authorizedHeader, 
                   "redirect": "follow" }
    
    return { "url": url,
             "init": init }
}