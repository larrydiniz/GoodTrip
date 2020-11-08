export default function itensCards(){

    return {

        setCheckboxAttributes: function( identity, checkbox, label, value){

            identity.setAttribute('value', value);
            checkbox.setAttribute('id', value);
            label.setAttribute('for', value);
        },

        setClonePersonalAttributes: function({ identityField, categoryField, checkboxField, labelField}, data){
            
            this.setCheckboxAttributes(identityField, checkboxField, labelField, data.id);

            categoryField.setAttribute('value', data.categoria);
            labelField.innerText = data.nome;
        },
        
        mapClonePersonalCard: function(fragment){
            const card = fragment.children[0];
            const identity = card.children[0];
            const category = card.children[1];
            const checkBox = card.children[2];
            const label = card.children[3];
        
            return {
                "identityField": identity,
                "categoryField": category,
                "checkboxField": checkBox,
                "labelField": label
            }
        },

        setCloneCommonAttributes: function({ identityField, imageField, usernameField, checkboxField, labelField }, data){

            this.setCheckboxAttributes(identityField, checkboxField, labelField, data.id);
            
            imageField.src = data.usuario.foto;
            usernameField.innerText = data.usuario.user;
            labelField.innerText = data.nome;
        },

        mapCloneCommonCard: function(fragment){
            const commonCard = fragment.children[0];
            const authorImg = commonCard.children[1].children[0];
            const user = commonCard.children[1].children[1];
            const identity = commonCard.children[0].children[0];
            const checkbox = commonCard.children[0].children[2];
            const label = commonCard.children[0].children[3];

            return {
                "identityField": identity,
                "imageField": authorImg,
                "usernameField": user,
                "checkboxField": checkbox,
                "labelField": label
            }
        },

        buildPersonalCard: function(template, data){
            const clonedPersonalCard = template.content.cloneNode(true);
            const mappedPersonalCard = this.mapClonePersonalCard(clonedPersonalCard);
        
            this.setClonePersonalAttributes(mappedPersonalCard, data);
        
            return clonedPersonalCard;
        },

        buildCommonCard: function(template, data){
            const clonedCommonCard = template.content.cloneNode(true);
            const mappedCommonCard = this.mapCloneCommonCard(clonedCommonCard);
        
            this.setCloneCommonAttributes(mappedCommonCard, data);
        
            return clonedCommonCard;
        }
    }
}