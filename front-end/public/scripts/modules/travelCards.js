export default function travelCards(){

    return {
        setCloneCardAttributes: function({ imageField, titleField, dateField }, parsedData){

            imageField.src = parsedData.imagem;
            titleField.innerText = parsedData.titulo;
            dateField.innerText = parsedData.month + "\n" + parsedData.year;
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
        }
    }
}