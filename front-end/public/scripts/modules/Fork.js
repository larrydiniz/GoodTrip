const Fork = {
    "of": function(__value){
        return {
            "value": __value,

            "isValidProp": function(p){

                return p.length > 2 && p != null && p != undefined && isNaN(p) && p != ""
            },

            "between": function(__left, __right){
                
                return this.isValidProp(__left) && this.isValidProp(__right)? Forkable.of(this.value, __left, __right): Forkable.of(null)
            }
        }
    }
}

const Forkable = {
    "of": function(__value, __left, __right){

        return{

            "value": __value,
    
            "right": __right,
            
            "left": __left,

            "init": function(){

                const o = {}

                Object.defineProperty(o, this.left, { value: [], writable: true })

                Object.defineProperty(o, this.right, { value: [], writable: true })
                
                return o
            },
    
            "isValid": function(){
    
                return Array.isArray(this.value)
            },

            "flatReduce": function(predicate){
                
                return this.isValid()? this.value.reduce((acc, curr) => predicate(curr)? (acc[this.left].push(curr), acc): (acc[this.right].push(curr), acc), this.init()): null
            }
        }
    }
}

export default Fork