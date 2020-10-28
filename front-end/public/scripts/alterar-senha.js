const passwordVisibility = {

	/** Password fields namespace **/

	setFields: function(passwordFields){
		const properties = {
			actualPassword: {
				value: passwordFields.actualPassword,
				writable: false
			},
			newPassword: {
				value: passwordFields.newPassword,
				writable: false
			},
			confirmPassword: {
				value: passwordFields.confirmPassword,
				writable: false
			}
		}

		return Object.defineProperties({}, properties);
	},

	mountTypeListeners: function({ fields }){

		const toggleTypes = {
			primary: "password",
			secondary: "text"
		}

		fields.actualPassword.addEventListener("click", typeToggler({element: fields.actualPassword, toggleTypes: toggleTypes}));
		fields.newPassword.addEventListener("click", typeToggler({element: fields.newPassword, toggleTypes: toggleTypes}));
		fields.confirmPassword.addEventListener("click", typeToggler({element: fields.confirmPassword, toggleTypes: toggleTypes}));
		
	},
	
	mountSourceListeners: function({ fields }){
		const toggleSources = {
			primary: "../public/icons/olho-fechado.svg",
			secondary: "../public/icons/olho-aberto.svg"
		}
		
		fields.actualPassword.addEventListener("toggling", sourceToggler({element: fields.actualPassword.firstElementChild, toggleSources: toggleSources}));
		fields.newPassword.addEventListener("toggling", sourceToggler({element: fields.newPassword.firstElementChild, toggleSources: toggleSources}));
		fields.confirmPassword.addEventListener("toggling", sourceToggler({element: fields.confirmPassword.firstElementChild, toggleSources: toggleSources}));
	}
}

/*************** Visualizar Senha *****************/
function visualizar(id, cod){
	
	let campo = document.getElementById(id);
	
	//botão
	if (cod == '1'){
		var olho = document.querySelector(".olho1");
	} else if (cod == '2') {
		var olho = document.querySelector(".olho2");
	} else {
		var olho = document.querySelector(".olho3");
	}
	
	//visualização da senha
	if (campo.type == 'password'){
		campo.type = 'text';
		olho.src = "../public/icons/olho-aberto.svg"
	}
	else{
		campo.type = 'password';
		olho.src = "../public/icons/olho-fechado.svg"
	}	
}

/******** MAIN ******/
const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');
const actualPasswordField = document.querySelector(".olho1");
const newPasswordField = document.querySelector(".olho2");
const confirmPasswordField = document.querySelector(".olho3");

const passwordFields = passwordVisibility.setFields({ actualPassword: actualPasswordField, newPassword: newPasswordField, confirmPassword: confirmPasswordField });

passwordVisibility.mountTypeListeners({ fields: passwordFields });
passwordVisibility.mountSourceListeners({ fields: passwordFields});

menuButton.addEventListener('click', classToggler({element: navMenu, toggleClass: "show"}));