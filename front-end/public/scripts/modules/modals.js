export default function modals(classToggler){

	/** Modals namespace **/

	return {
		defineModal: function (modalProps){
			
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
		
		addOpenedListeners: function({ modal }){
	
			if(this.hasValidProps(modal)){
	
				modal.openButton.addEventListener("click", classToggler({element: modal.content, toggleClass: modal.visibilityClass}));
			}
		},

		addClosedListeners: function({ modal }){
	
			if(this.hasValidProps(modal)){

				modal.closeButton.addEventListener("click", classToggler({element: modal.content, toggleClass: modal.visibilityClass}));
			}
		},

		addTogglingListeners: function({ modal }){
	
			if(this.hasValidProps(modal)){
	
				modal.content.addEventListener("toggling", classToggler({element: modal.modalOverlay, toggleClass: modal.visibilityClass}));
			}
		},
	
		hasValidProps: function(modalProps){
			
			return !!(modalProps.openButton && modalProps.closeButton && modalProps.content && modalProps.modalOverlay && modalProps.visibilityClass)
		}
	}
}