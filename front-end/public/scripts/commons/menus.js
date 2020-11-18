import menu from "../modules/menu.js"
import getUser from "../requests/getUser.js"
import gtHeaders from "../requests/gtHeaders.js";
import { classToggler} from "../utils/togglers.js"

const mnu = menu(classToggler);

const navMenu = document.getElementById("menu");
const menuButton = document.querySelector(".menu-landing");
const userImageField = document.querySelector("img.img-perfil");
const nameField = document.querySelector("div#nome");
const usernameField = document.querySelector("div#user");
const menuMobile = mnu.defineMenu({ openButton: menuButton,
                                    content: navMenu, 
                                    visibilityClass: "show" });

function setUserMenuAttributes(imageField, nameField, usernameField, data){

    imageField.src = data.foto;
    nameField.innerText = data.nome;
    usernameField.innerText = data.username;
}

window.addEventListener('load', () => {

    mnu.addOpenedListeners({ menu: menuMobile });

    const request = getUser(gtHeaders.authorized())

    fetch(request.url, request.init)
        .then(res => res.json())
        .then(json => (setUserMenuAttributes(userImageField, nameField, usernameField, json), json))
        .then(json => navMenu.dispatchEvent(new CustomEvent("menuWasBuilded", { detail: json })))
        .catch(e => console.log(e))
})
    