function passwordVisibility(typeToggler, sourceToggler){

	/** Password fields namespace **/

	return {

		defineFields: function(passwordFields){
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
	
		addTypeListeners: function({ fields }){

			if(this.hasValidProps(fields)){

				const types = {
					primary: "password",
					secondary: "text"
				}
		
				fields.actualPassword.addEventListener("click", typeToggler({element: fields.actualPassword, toggleTypes: types}));
				fields.newPassword.addEventListener("click", typeToggler({element: fields.newPassword, toggleTypes: types}));
				fields.confirmPassword.addEventListener("click", typeToggler({element: fields.confirmPassword, toggleTypes: types}));
			}
			
		},
		
		addSourceListeners: function({ fields }){

			if(this.hasValidProps(fields)){

				const sources = {
					primary: "../public/icons/olho-fechado.svg",
					secondary: "../public/icons/olho-aberto.svg"
				}
				
				fields.actualPassword.addEventListener("toggling", sourceToggler({element: fields.actualPassword.firstElementChild, toggleSources: sources}));
				fields.newPassword.addEventListener("toggling", sourceToggler({element: fields.newPassword.firstElementChild, toggleSources: sources}));
				fields.confirmPassword.addEventListener("toggling", sourceToggler({element: fields.confirmPassword.firstElementChild, toggleSources: sources}));
			}
		},

		hasValidProps: function(fieldsProps){
			if(fieldsProps.actualPassword && fieldsProps.newPassword && fieldsProps.confirmPassword){
	
				return true;
			}
			else{
	
				return false;
			}
		}
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
const pv = passwordVisibility(typeToggler, sourceToggler);

const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');
const actualPasswordField = document.querySelector(".olho1");
const newPasswordField = document.querySelector(".olho2");
const confirmPasswordField = document.querySelector(".olho3");


const passwordFields = pv.defineFields({ actualPassword: actualPasswordField, newPassword: newPasswordField, confirmPassword: confirmPasswordField });

pv.addTypeListeners({ fields: passwordFields });
pv.addSourceListeners({ fields: passwordFields});

menuButton.addEventListener('click', classToggler({element: navMenu, toggleClass: "show"}));