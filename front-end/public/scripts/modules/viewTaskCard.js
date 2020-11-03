export default function viewTaskCard(){

    return {
        setCloneCardAttributes: function({hourField, titleField, priceField, currencyField,
                                        transportField, textField}, data){
            hourField.innerText = data.horario;
            titleField.innerText = data.titulo;
            priceField.innerText = data.custo;
            currencyField.innerText = data.moeda;
            transportField.innerText = data.transporte;
            textField.innerText = data.descricao;
        },
        
        mapCloneViewTaskCard: function(fragment){
            const taskCardTitle = fragment.children[0];
            const taskCardInfos = fragment.children[1];
            const taskText = fragment.children[2];
            const taskHour = taskCardTitle.children[0];
            const taskTitle = taskCardTitle.children[1];
            const taskCurrency = taskCardInfos.children[0].children[0];
            const taskPrice = taskCardInfos.children[0].children[1];
            const taskTransport = taskCardInfos.children[1];

        
            return {
                "hourField": taskHour,
                "titleField": taskTitle,
                "currencyField": taskCurrency,
                "priceField": taskPrice,
                "transportField": taskTransport,
                "textField": taskText
            }
        },

        buildCard: function(template, data){
            
            const clonedTaskCard = template.content.cloneNode(true);
            const mappedTaskCard = this.mapCloneViewTaskCard(clonedTaskCard);
            
            this.setCloneCardAttributes(mappedTaskCard, data);
        
            return clonedTaskCard;
        }
    }
}