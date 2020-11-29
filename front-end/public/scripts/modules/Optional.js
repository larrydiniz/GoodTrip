const Optional = {
    
    "of": function(__value){

        return {

            "value": __value,

            "isValid": function(value){

                return (value !== null && value !== undefined && value !== "")
            },

            "isPresent": function(){

                return this.isValid(this.value)? true: false
            },

            "map": function(fn){

                return this.isValid(this.value)? Optional.of(fn(this.value)): Optional.of(null)
            },

            "flatMap": function(fn){

                return this.isValid(this.value) && this.value.map? Optional.of(this.value.map(fn)): Optional.of(null)
            },

            "filter": function(fn){

                return this.isValid(this.value)? fn(this.value)? Optional.of(this.value): Optional.of(null) : Optional.of(null)
            },

            "getOrElse": function(fn){

                return this.isValid(this.value)? this.value: fn();
            },

            "getThen": function(fn){

                return this.isValid(this.value)? fn(this.value): false
            }
        }
    }
}


export default Optional;