export default function itensCards(){

    return {

        setCheckboxAttributes: function( identity, checkbox, labelCheck, label, data){

            checkbox.onchange = function(){

                const parent = this.parentElement
          
                const id = parent.children[0].value
          
                const body = { "checado": this.checked }
          
                window.dispatchEvent(new CustomEvent('checkboxChangeValue', { detail: { "id": id, "body": body }}))
            }

            if(data.checado){

                checkbox.setAttribute('checked', data.checado);
            }

            identity.setAttribute('value', data.id);
            checkbox.setAttribute('id', data.id);
            labelCheck.setAttribute('for', data.id);
            label.setAttribute('for', data.id);
        },

        setClonePersonalAttributes: function({ identityField, categoryField, checkboxField, labelCheckbox, labelField}, data){
            
            this.setCheckboxAttributes(identityField, checkboxField, labelCheckbox, labelField, data);

            categoryField.setAttribute('value', data.categoria);
            labelField.innerText = data.nome;
        },
        
        mapClonePersonalCard: function(fragment){
            const card = fragment.children[0];
            const identity = card.children[0];
            const category = card.children[1];
            const checkBox = card.children[2];
            const labelCheck = card.children[3];
            const label = card.children[4];
            const deleteButton = card.children[5];
        
            return {
                "identityField": identity,
                "categoryField": category,
                "checkboxField": checkBox,
                "labelCheckbox": labelCheck,
                "labelField": label,
                "deleteButton": deleteButton
            }
        },

        setCloneCommonAttributes: function({ identityField, imageField, usernameField, checkboxField, labelCheckbox, labelField }, data){

            this.setCheckboxAttributes(identityField, checkboxField, labelCheckbox, labelField, data);
            
            imageField.src = data.usuario.foto;
            //usernameField.innerText = data.usuario.username;
            labelField.innerText = data.nome;
        },

        mapCloneCommonCard: function(fragment){
            const commonCard = fragment.children[0];
            const authorImg = commonCard.children[1].children[0];
            const user = commonCard.children[1].children[1];
            const identity = commonCard.children[0].children[0];
            const checkbox = commonCard.children[0].children[2];
            const labelCheck = commonCard.children[0].children[3];
            const label = commonCard.children[0].children[4];
            const deleteButton = commonCard.children[0].children[5];

            return {
                "identityField": identity,
                "imageField": authorImg,
                "usernameField": user,
                "checkboxField": checkbox,
                "labelCheckbox": labelCheck,
                "labelField": label,
                "deleteButton": deleteButton
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