export default function invitationsCards(){
    return {

        setCloneUserAttributes: function({ imageField, nameField, usernameField }, data){
        
            imageField.src = data.autor.foto;
            nameField.innerText = data.autor.nome;
            usernameField.innerText = data.autor.username;
        },

        setCloneTravelAttributes: function({ titleField, dateField }, data){

            titleField.innerText = data.destino;
            dateField.innerText = data.month + " | " + data.year;
        },

        setCloneButtonsListeners: function(buttonsList, data){

            buttonsList.forEach(button => {
                
                button.onclick = () => window.dispatchEvent(new CustomEvent("invitation-click", { detail: { "invitation": data.id, "action": button.name }}));
            })
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

        mapCloneButtons: function(fragment){
            const buttonsCard = fragment.children[0].children[1];
            const acceptButton = buttonsCard.children[1].children[0].children[0];
            const refuseButton = buttonsCard.children[1].children[1].children[0];

            return [acceptButton, refuseButton];
        },
        
        buildCard: function (template, data){

            const clonedInvitationCard = template.content.cloneNode(true);
            const mappedInvitationUserInfos = this.mapCloneUserInfos(clonedInvitationCard);
            const mappedInvitationTravelInfos = this.mapCloneTravelInfos(clonedInvitationCard);
            const mappedButtons = this.mapCloneButtons(clonedInvitationCard);
            
            this.setCloneUserAttributes(mappedInvitationUserInfos, data);
            this.setCloneTravelAttributes(mappedInvitationTravelInfos, data);
            this.setCloneButtonsListeners(mappedButtons, data);
        
            return clonedInvitationCard;
        }
    }
}