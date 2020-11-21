export default function travelCards(){

    return {
        mapMemberImage: function(memberFoto){
            return {
                "source": memberFoto,
                "element": document.createElement("img")
            }
        },

        setMembersImagesAttributes: function(element, source){
            element.setAttribute('src', source);
            element.setAttribute('class', 'imagem-membro');

            return element;
        },

        setMembersImages: function(membersBlock, members){

            membersBlock.classList.add('ativa');

            members.map(member => this.mapMemberImage(member.usuario.foto))
                   .map(({ element, source }) => this.setMembersImagesAttributes(element, source))
                   .forEach(image => membersBlock.appendChild(image))
        },

        setCloneCardAttributes: function({ imageField, titleField, dateField, linkField, identityField}, data){

            imageField.style.backgroundImage = `url(${data.imagem})`;
            titleField.innerText = data.destino;
            dateField.innerText = data.month + "\n" + data.year;
            identityField.value = data.id;
            linkField.href += `?travel_id=${data.id}`;
        },
        
        mapCloneTravelCard: function(fragment){
            const travelCard = fragment.children[0];
            const travelImage = travelCard.children[0];
            const travelTitle = travelCard.children[0].children[0];
            const travelMembers = travelCard.children[0].children[1];
            const travelDate = travelCard.children[0].children[2];
            const travelId = travelCard.children[0].children[3];
        
            return {
                "imageField": travelImage,
                "titleField": travelTitle,
                "membersField": travelMembers,
                "dateField": travelDate,
                "linkField": travelCard,
                "identityField": travelId,
            }
        },

        buildCard: function(template, data){
            
            const clonedTravelCard = template.content.cloneNode(true);
            const mappedTravelCard = this.mapCloneTravelCard(clonedTravelCard);
            
            this.setCloneCardAttributes(mappedTravelCard, data);

            if(data.embarques.length){

                this.setMembersImages(mappedTravelCard.membersField, data.embarques);
            }
        
            return clonedTravelCard;
        }
    }
}