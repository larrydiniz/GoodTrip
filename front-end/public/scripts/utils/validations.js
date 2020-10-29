export function lengthValidation({ minLength, maxLength }){
    
    return function (input){

        return (input.value.length >= minLength && str.length <= maxLength);
    }
}

export function typeOfValidation({ type }){

    return function(input){

        return (typeof input.value === type);
    }
}

export function fileSizeValidation({ minSize, maxSize }){

    return function(input){

        return (input.files[0].size < maxSize && input.files[0].size > minSize)
    }
}

export function isFirstCharDiferent({ character }){

    return function(input){

        return (input.value[0] !== character);
    }
}

export function isLastCharDiferent({ character }){

    return function(input){

        return (input.value[input.value.length - 1] !== character);
    }
}

export function isEmail(){

    return function(input){

        const user = input.value.substring(0, input.value.indexOf("@"));
        const domain = input.value.substring(input.value.indexOf("@") + 1, input.value.length);

        return((user.length >=1) &&
               (domain.length >=3) &&
               (user.search("@")==-1) &&
               (domain.search("@")==-1) &&
               (user.search(" ")==-1) &&
               (domain.search(" ")==-1) &&
               (domain.search(".")!=-1) &&
               (domain.indexOf(".") >=1)&&
               (domain.lastIndexOf(".") < domain.length - 1));
    }
}