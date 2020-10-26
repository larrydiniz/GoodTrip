const menuLateral = document.getElementById("menu");

//Expande menu
expandedMenu = () => {
	if(!menuLateral.classList.contains("show")){
		menuLateral.classList.add("show") 
	} else {
		menuLateral.classList.remove("show") 
	}
}