import menu from "../modules/menu.js"
import { classToggler} from "../utils/togglers.js"

const navMenu = document.getElementById("menu");
const menuButton = document.querySelector(".menu-landing");

const mnu = menu(classToggler);

const menuMobile = mnu.defineMenu({ openButton: menuButton,
                                    content: navMenu, 
                                    visibilityClass: "show" });

mnu.addOpenedListeners({ menu: menuMobile });