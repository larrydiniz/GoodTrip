export default function travelCards(){

    return {
        setCloneCardAttributes: function({ imageField, titleField, dateField }, data){

            const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            const splittedDate = data.inicio.split("-");
            const monthIndex = Number.parseInt(splittedDate[1]) - 1

            imageField.src = data.imagem;
            titleField.innerText = data.titulo;
            dateField.innerText = months[monthIndex] + "\n" + splittedDate[2];
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