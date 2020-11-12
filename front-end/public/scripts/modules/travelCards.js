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

            if(members.length){

                console.log(members)

                membersBlock.classList.add('ativa');

                members.map(member => this.mapMemberImage(member.usuario.foto))
                       .map(({ element, source }) => this.setMembersImagesAttributes(element, source))
                       .forEach(image => membersBlock.appendChild(image))
            }
        },

        setCloneCardAttributes: function({ imageField, titleField, dateField, linkField, identityField, categoryField, authorField }, data){

            imageField.style.backgroundImage = `url(${data.imagem})`;
            titleField.innerText = data.destino;
            dateField.innerText = data.month + "\n" + data.year;
            identityField.value = data.id;
            // categoryField.children[data.categoria].classList.add("selecionado");
            linkField.href += `?travel_id=${data.id}`;
            //authorField.innerText = data.autor.user;
        },
        
        mapCloneTravelCard: function(fragment){
            const travelCard = fragment.children[0];
            const travelImage = travelCard.children[0];
            const travelTitle = travelCard.children[0].children[0];
            const travelMembers = travelCard.children[0].children[1];
            const travelDate = travelCard.children[0].children[2];
            const travelId = travelCard.children[0].children[3]
            const travelCategories = travelCard.children[0].children[4];
            const travelAuthor = travelCard.children[0].children[5];
        
            return {
                "imageField": travelImage,
                "titleField": travelTitle,
                "membersField": travelMembers,
                "dateField": travelDate,
                "linkField": travelCard,
                "identityField": travelId,
                "categoryField": travelCategories,
                "authorField": travelAuthor
            }
        },

        buildCard: function(template, data){
            
            const clonedTravelCard = template.content.cloneNode(true);
            const mappedTravelCard = this.mapCloneTravelCard(clonedTravelCard);
            
            this.setCloneCardAttributes(mappedTravelCard, data);
            this.setMembersImages(mappedTravelCard.membersField, data.embarques);
        
            return clonedTravelCard;
        }
    }
}