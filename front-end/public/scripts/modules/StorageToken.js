const StorageToken = {

    "storeToken": function(token){
                            
        localStorage.setItem("AUTHENTICATED_TOKEN", `Bearer ${token}`)
    },

    "getStoragedToken": function(){

        return localStorage.getItem("AUTHENTICATED_TOKEN")
    }
}

export default StorageToken;