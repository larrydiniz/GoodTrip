export default function urlParser(){

    return {

        mapVariables: function (url){
            
            const variables = url.split("?")[1];
            const splittedVariables = variables.split("&");

            return splittedVariables.reduce((acc, current) => Object.defineProperty(acc, current.split("=")[0], { value: current.split("=")[1], writable: false }), {});
        }
    }
}