const gtHeaders = {
    "authorized": function (){
        return { "Authorization": localStorage.getItem("AUTHENTICATED_TOKEN"),
                 "Content-Type": "application/json" }
    },
    "commom": function (){
        return { "Content-Type": "application/json" }
    }
}

export default gtHeaders;