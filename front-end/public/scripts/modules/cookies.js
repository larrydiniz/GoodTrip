export default function cookies(document){

    return {

        setCookie: function(cookieName, cookieValue){

            document.cookie = cookieName + "=" + cookieValue;
        },

        getCookie: function(cookieName){
            
            const cookieTuple = document.cookie.split("; ")
                                               .map(cookie => cookie.split("="))
                                               .find(cookie => cookie[0] === cookieName)
                                               
            return cookieTuple? cookieTuple[1]: ""
        }
    }
}