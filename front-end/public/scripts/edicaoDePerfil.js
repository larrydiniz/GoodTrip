import menu from "./modules/menu.js"
import imagePreviewer from "./utils/imagePreviewer.js"
import { classToggler } from "./utils/togglers.js"

const inputImg = document.querySelector('input#edicao_perfil_inputImagem');
const imgPreview = document.querySelector('img#edicao_perfil_img');
const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');

const mnu = menu(classToggler);

const mobileMenu = mnu.defineMenu({ openButton: menuButton,
									content: navMenu,
									visibilityClass: "show" })
									
inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));

mnu.addOpenedListeners({ menu: mobileMenu });
