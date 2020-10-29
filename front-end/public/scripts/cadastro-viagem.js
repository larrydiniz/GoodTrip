import menu from "./modules/menu.js"
import imagePreviewer from "./utils/imagePreviewer.js"
import { classToggler } from "./utils/togglers.js"

const mnu = menu(classToggler);

const inputImg = document.querySelector('input#carregar-imagem');
const imgPreview = document.querySelector('img#preview');
const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');

const mobileMenu = mnu.defineMenu({ openButton: menuButton,
									content: navMenu,
									visibilityClass: "show" });

inputImg.addEventListener('change', imagePreviewer({input: inputImg, previewBox: imgPreview}));

mnu.addOpenedListeners({ menu: mobileMenu });