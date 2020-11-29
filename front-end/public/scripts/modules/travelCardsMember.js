export default function travelCards(){
        return {
            setCloneCardAttributes: function({ imageField, titleField, dateField, linkField, identityField, autorTrip}, data){
                
                const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
                const splittedDate = data.viagem.inicio.split("-");
                const monthIndex = Number.parseInt(splittedDate[1]) - 1;
                const month = months[monthIndex];
                const year = splittedDate[0];

                imageField.style.backgroundImage = `url(${data.viagem.imagem})`;
                titleField.innerText = data.viagem.destino;
                dateField.innerText = month + "\n" + year;
                identityField.value = data.viagem.id;
                linkField.href += `?travel_id=${data.viagem.id}`;
                autorTrip.innerHTML = `<p> Viagem de ${data.autor.nome} </p>`;
            },
            
            mapCloneTravelCard: function(fragment){
                const travelCard = fragment.children[0];
                const travelImage = travelCard.children[0];
                const travelTitle = travelCard.children[0].children[0];
                const travelAutor = travelCard.children[0].children[1];
                const travelDate = travelCard.children[0].children[2];
                const travelId = travelCard.children[0].children[3];
            
                return {
                    "imageField": travelImage,
                    "autorTrip": travelAutor,
                    "titleField": travelTitle,
                    "dateField": travelDate,
                    "linkField": travelCard,
                    "identityField": travelId,
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