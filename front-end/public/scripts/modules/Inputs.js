const Inputs = {
    "areUnaltered": function(input){ 
        
        if(input.value == undefined || input.value == null || input.value === "" || input.value.length < 3){

            input.value = "__inalterado__"
        }

        return input
    },
    "reduceByInputName": function(acc, currentInput){

        acc[currentInput.name] = currentInput.value

        currentInput.value = ""
        
        return acc
    }
}

export default Inputs