export default function gettravelTasks(authorizedHeader, data, id){

    //const url = `http://localhost:3333/tarefas/viagem/ler?id_viagem=${id}&finalizada=false`

    const url = `http://localhost:3333/tarefas/buscar?data=${data}&idviagem=${id}`;

    const init = { "headers": authorizedHeader, 
                   "redirect": "follow" }
    
    return { "url": url,
             "init": init }
}