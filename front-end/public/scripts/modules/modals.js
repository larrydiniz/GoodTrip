export default function modals(classToggler, modalOverlay, visibilityClass){

	/** Modals namespace **/

	return {
		defineModal: function (openButton, closeButton, content){
	
			const properties = {
				openButton: { value: openButton,
								writable: false },
								
				closeButton: { value: closeButton,
								writable: false },
								
				content: { value: content,
							writable: false }
			}
			
			/** Immutable modal object **/
	
			return Object.defineProperties({}, properties);
		},
		
		addOpenedListeners: function( modal ){
	
			if(this.hasValidProps(modal)){
	
				modal.openButton.addEventListener("click", classToggler({element: modal.content, toggleClass: visibilityClass}));
			}
		},

		addClosedListeners: function( modal ){
	
			if(this.hasValidProps(modal)){

				modal.closeButton.addEventListener("click", classToggler({element: modal.content, toggleClass: visibilityClass}));
			}
		},

		addTogglingListeners: function( modal ){
	
			if(this.hasValidProps(modal)){
	
				modal.content.addEventListener("toggling", classToggler({element: modalOverlay, toggleClass: visibilityClass}));
			}
		},
	
		hasValidProps: function(modalProps){

			return (modalProps.openButton && modalProps.closeButton && modalProps.content)
		}
	}
}