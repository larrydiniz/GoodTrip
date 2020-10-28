const modals = {

	/** Modals namespace **/

	mountModal: function (modalProps){

		if(this.hasValidProps(modalProps)){

			const properties = {
				openButton: { value: modalProps.openButton,
								writable: false },
								
				closeButton: { value: modalProps.closeButton,
								writable: false },
								
				content: { value: modalProps.content,
							writable: false },
							
				modalOverlay: { value: modalProps.modalOverlay,
								writable: false },
								
				visibilityClass: { value: modalProps.visibilityClass,
									writable: false }
			}
			
			/** Immutable modal object **/
	
			return Object.defineProperties({}, properties);
		}
		else{

			return console.error("Propriedades inválidas para montar um modal");
		}
	},
	
	mountListeners: function({ modal }){

		if(this.hasValidProps(modal)){

			modal.openButton.addEventListener("click", classToggler({element: modal.content, toggleClass: modal.visibilityClass}));
			modal.closeButton.addEventListener("click", classToggler({element: modal.content, toggleClass: modal.visibilityClass}));
			modal.content.addEventListener("toggling", classToggler({element: modal.modalOverlay, toggleClass: modal.visibilityClass}));
		}
		else{

			return console.error("Propriedades de modal inválidas para montar listeners");
		}
	},

	hasValidProps: function(modalProps){
		if(modalProps.openButton && modalProps.closeButton && modalProps.content && modalProps.modalOverlay && modalProps.visibilityClass){

			return true;
		}
		else{

			return false;
		}
	}
}

/***** MAIN *****/
const nav = document.getElementById("menu");
const btn = document.querySelector(".menu-landing");
const overlay = document.querySelector("div.overlay");
const ulNav = document.querySelector("ul");

btn.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));
nav.addEventListener("click", classToggler({element: nav, toggleClass: "show"}));
overlay.addEventListener("toggling", classToggler({element: ulNav, toggleClass: "hide"}));

const loginModal = modals.mountModal({ openButton: document.querySelector("button#entrar.menu"),
									   closeButton: document.querySelector("button.login.fechar"),
									   content: document.querySelector("div.login.modal"),
									   modalOverlay: overlay,
									   visibilityClass: "show" })

const registerModal = modals.mountModal({ openButton: document.querySelector("button#cadastrar.menu"),
										  closeButton: document.querySelector("button.cadastro.fechar"),
										  content: document.querySelector("div.cadastro.modal"),
										  modalOverlay: overlay,
										  visibilityClass: "show" })

modals.mountListeners({modal: loginModal});
modals.mountListeners({modal: registerModal});
