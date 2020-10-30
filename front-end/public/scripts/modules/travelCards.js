export default function travelCards(){

    return {
        setCloneCardAttributes: function({ imageField, titleField, dateField }, data){

            imageField.src = data.imagem;
            titleField.innerText = data.titulo;
            dateField.innerText = data.month + "\n" + data.year;
        },
        
        mapCloneTravelCard: function(fragment){
            const travelCard = fragment.children[0].children[0];
            const travelTitle = travelCard.children[0];
            const travelDate = travelCard.children[1];
            const travelImage = travelCard.children[2];
        
            return {
                "imageField": travelImage,
                "titleField": travelTitle,
                "dateField": travelDate
            }
        },

        buildCard: function(template, data){
            
            const clonedTravelCard = template.content.cloneNode(true);
            const mappedTravelCard = this.mapCloneTravelCard(clonedTravelCard);
            
            this.setCloneCardAttributes(mappedTravelCard, data);
        
            return clonedTravelCard;
        }
    }
}