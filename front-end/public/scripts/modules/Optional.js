const Optional = {
    
    "of": function(__value){

        return {

            "value": __value,

            "isValid": function(value){

                return (value !== null && value !== undefined && !Array.isArray(value) && value !== "")
            },

            "map": function(fn){

                return this.isValid(this.value)? Optional.of(fn(this.value)): Optional.of(null)
            },

            "filter": function(fn){

                return this.isValid(this.value)? fn(this.value)? Optional.of(this.value): Optional.of(null) : Optional.of(null)
            },

            "getOrElse": function(fn){

                return this.isValid(this.value)? this.value: fn();
            }
        }
    }
}


export default Optional;