export default function taskCards(){

    return {
        setCloneCardAttributes: function({ idField, hourField, titleField}, data){
            idField.href = `visualizar-tarefa.html?${data.id_tarefa}`;
            hourField.innerText = data.horario;
            titleField.innerText = data.titulo;
        },
        
        mapCloneTaskCard: function(fragment){
            const taskCard = fragment.children[0];
            const taskHour = taskCard.children[0];
            const taskTitle = taskCard.children[1];
        
            return {
                "idField": taskCard,
                "hourField": taskHour,
                "titleField": taskTitle
            }
        },

        buildCard: function(template, data){
            
            const clonedTaskCard = template.content.cloneNode(true);
            const mappedTaskCard = this.mapCloneTaskCard(clonedTaskCard);
            
            this.setCloneCardAttributes(mappedTaskCard, data);
        
            return clonedTaskCard;
        }
    }
}