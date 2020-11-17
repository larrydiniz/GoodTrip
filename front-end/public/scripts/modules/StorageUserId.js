const storageUserId = {

    "storeUserId": function(id){
                            
        localStorage.setItem("USER_ID", id)
    },

    "getStoragedToken": function(){

        return localStorage.getItem("USER_ID")
    }
}

export default storageUserId