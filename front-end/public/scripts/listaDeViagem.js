const menuLateral = document.getElementById("navBar");

//Expande menu
expandedMenu = () => {
	if(!menuLateral.classList.contains("show")){
		menuLateral.classList.add("show") 
	} else {
		menuLateral.classList.remove("show") 
	}
}