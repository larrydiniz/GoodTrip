export default function itensCards(){

    return {

        setCheckboxAttributes: function(checkbox, label, value){

            checkbox.setAttribute('name', value);
            checkbox.setAttribute('id', value);
            label.setAttribute('for', value);
        },

        setClonePersonalAttributes: function({ categoryField, checkboxField, labelField}, data){
            
            this.setCheckboxAttributes(checkboxField, labelField, data.id);

            categoryField.setAttribute('value', data.categoria);
            labelField.innerText = data.nome;
        },
        
        mapClonePersonalCard: function(fragment){
            const card = fragment.children[0];
            const category = card.children[0];
            const checkBox = card.children[1];
            const label = card.children[2];
        
            return {
                "categoryField": category,
                "checkboxField": checkBox,
                "labelField": label
            }
        },

        setCloneCommonAttributes: function({ imageField, usernameField, checkboxField, labelField }, data){

            this.setCheckboxAttributes(checkboxField, labelField, data.id);
            
            imageField.src = data.usuario.foto;
            usernameField.innerText = data.usuario.user;
            labelField.innerText = data.nome;
        },

        mapCloneCommonCard: function(fragment){
            const commonCard = fragment.children[0];
            const authorImg = commonCard.children[1].children[0];
            const user = commonCard.children[1].children[1];
            const checkbox = commonCard.children[0].children[0];
            const label = commonCard.children[0].children[1];

            return {
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