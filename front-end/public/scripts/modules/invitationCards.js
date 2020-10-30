export default function invitationsCards(){
    return {

        setCloneUserAttributes: function({ imageField, nameField, usernameField }, data){
        
            imageField.src = data.autor.foto;
            nameField.innerText = data.autor.nome;
            usernameField.innerText = data.autor.user;
        },

        setCloneTravelAttributes: function({ titleField, dateField }, parsedData){

            titleField.innerText = parsedData.titulo;
            dateField.innerText = parsedData.month + " | " + parsedData.year;
        },
        
        mapCloneUserInfos: function(fragment){
            const userInfosCard = fragment.children[0].children[0];
            const image = userInfosCard.children[0].children[0];
            const name = userInfosCard.children[1].children[0];
            const username = userInfosCard.children[1].children[1];
        
            return {
                "imageField": image,
                "nameField": name,
                "usernameField": username
            }
        },
        
        mapCloneTravelInfos: function(fragment){
            const travelInfosCard = fragment.children[0].children[1];
            const name = travelInfosCard.children[0].children[0];
            const date = travelInfosCard.children[0].children[1];
        
            return {
                "titleField": name,
                "dateField": date
            }
        },
        
        buildCard: function (template, data){

            const clonedInvitationCard = template.content.cloneNode(true);
            const mappedInvitationUserInfos = this.mapCloneUserInfos(clonedInvitationCard);
            const mappedInvitationTravelInfos = this.mapCloneTravelInfos(clonedInvitationCard);
            
            this.setCloneUserAttributes(mappedInvitationUserInfos, data);
            this.setCloneTravelAttributes(mappedInvitationTravelInfos, data);
        
            return clonedInvitationCard;
        }
    }
}