import menu from "../modules/menu.js"
import { classToggler} from "../utils/togglers.js"

const navMenu = document.getElementById("menu");
const menuButton = document.querySelector(".menu-landing");
const userImageField = document.querySelector("img.img-perfil");
const nameField = document.querySelector("div#nome");
const usernameField = document.querySelector("div#user");

function setUserMenuAttributes(imageField, nameField, usernameField, data){

    imageField.src = data.foto;
    nameField.innerText = data.nome;
    usernameField.innerText = data.user;
}

const mnu = menu(classToggler);

const menuMobile = mnu.defineMenu({ openButton: menuButton,
                                    content: navMenu, 
                                    visibilityClass: "show" });
    
mnu.addOpenedListeners({ menu: menuMobile });

fetch("/data/usuario.json")
    .then(res => res.json())
    .then(json => setUserMenuAttributes(userImageField, nameField, usernameField, json))