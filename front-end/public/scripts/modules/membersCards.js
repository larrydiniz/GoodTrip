export default function membersCards(){
    return {

        setCloneCardAttributes: function({ imageField, nameField, usernameField }, data){
        
            imageField.src = data.foto || data.usuario.foto;
            nameField.innerText = data.nome || data.usuario.nome;
            usernameField.innerText = data.username || data.usuario.username;
        },

        setGuestCardCancelButton: function(button, data){

            button.addEventListener("click", () => window.dispatchEvent(new CustomEvent("cancel-button-clicked", { detail: data.id })))
        },

        setInviteButton: function(button, data){

            const body = {

                "viagem": { "id": data.viagem },
                "usuario": {"id": data.id },
                "finalizada": false,
                "aceito": false
            }

            button.addEventListener("click", () => window.dispatchEvent(new CustomEvent("invite", {detail: body})))
        },
        
        mapCloneGuestCard: function(fragment){
            const guestCard = fragment.children[0].children[0];
            const guestButton = fragment.children[0].children[1];
            const guestImage = guestCard.children[0];
            const guestName = guestCard.children[1].children[0];
            const guestUsername = guestCard.children[1].children[1];
        
            return {
                "imageField": guestImage,
                "nameField": guestName,
                "usernameField": guestUsername,
                "button": guestButton
            }
        },
        
        mapCloneMemberCard: function(fragment){
            const memberCard = fragment.children[0]
            const memberImage = memberCard.children[0];
            const memberName = memberCard.children[1].children[0];
            const memberUsername = memberCard.children[1].children[1];
        
            return {
                "imageField": memberImage,
                "nameField": memberName,
                "usernameField": memberUsername
            }
        },

        buildGuestCard: function(template, data){
            const clonedGuestWrap = template.content.cloneNode(true);
            const mappedGuestCard = this.mapCloneGuestCard(clonedGuestWrap);
        
            this.setCloneCardAttributes(mappedGuestCard, data);
            this.setGuestCardCancelButton(mappedGuestCard.button, data);
        
            return clonedGuestWrap;
        },

        buildToInviteCard: function(template, data){
            const clonedInvitedWrap = template.content.cloneNode(true);
            const mappedInvitedCard = this.mapCloneGuestCard(clonedInvitedWrap);
        
            this.setCloneCardAttributes(mappedInvitedCard, data);
            this.setInviteButton(mappedInvitedCard.button, data);
        
            return clonedInvitedWrap;
        },

        buildMemberCard: function(template, data){
            const clonedMemberCard = template.content.cloneNode(true);
            const mappedMemberCard = this.mapCloneMemberCard(clonedMemberCard);
        
            this.setCloneCardAttributes(mappedMemberCard, data);
        
            return clonedMemberCard;
        }
    }
}