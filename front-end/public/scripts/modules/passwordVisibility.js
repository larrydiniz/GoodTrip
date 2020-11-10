export default function passwordVisibility(typeToggler, sourceToggler, types, icons){

	/** Password fields namespace **/

	return {

		defineField: function(button, input){

			const properties = {
				"button": {
					value: button,
					writable: false
				},
				"input": {
					value: input,
					writable: false
				}
			}
	
			return Object.defineProperties({}, properties);
		},
	
		addTypeListeners: function(field){

			if(this.hasValidProps(field)){

				field.button.addEventListener("click", typeToggler({element: field.input, toggleTypes: types}));
			}
			
		},
		
		addSourceListeners: function(field){

			if(this.hasValidProps(field)){
				
				field.input.addEventListener("toggling", sourceToggler({element: field.button.firstElementChild, toggleSources: icons}));
			}
		},

		hasValidProps: function(field){
			return (field.button && field.input)
		}
	}
}