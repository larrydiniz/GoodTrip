/************** Menu Overlay ************/
const nav = document.getElementById("menu");
const btn = document.querySelector(".menu-landing");

function menu (){
    let show = nav.classList.contains("show");

        if(show == false){
            nav.classList.add("show");
        }else{
            nav.classList.remove("show");
        }
}

btn.addEventListener("click", menu) 