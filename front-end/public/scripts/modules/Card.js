const Card = {
    "of": __template => ({

        "template": __template,

        "hasValidTemplate": () => this.template instanceof HTMLTemplateElement,

        "build": (__data, __fn) => this.hasValidTemplate()? Reduced.of(__fn(__template.content.cloneNode(true)), __data): new Error("Cannot build a card with a invalid template")
    })
}

const Reduced = {
    "of": (__card, __data) => ({

        "data": __data,

        "card": __card,

        "hasValidData": () => this.data != null && this.data != undefined && typeof this.data === "object",

        "set": function(fn){
        
            return this.hasValidData()? Reduced.of(fn(this.card, this.data), this.data): new Error("Cannot map with invalid data")
        
        },
        "get": function(){
        
            return this.card
        }
    })
}

export default Card
