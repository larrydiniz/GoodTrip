export default function passwordVisibility(typeToggler, sourceToggler){

	/** Password fields namespace **/

	return {

		defineField: function(passwordField){
			if(this.hasValidProps(passwordField)){

				const properties = {
					button: {
						value: passwordField.button,
						writable: false
					},
					input: {
						value: passwordField.input,
						writable: false
					},
					sources: {
						value: passwordField.sources,
						writable: false
					},
					types: {
						value: passwordField.types,
						writable: false
					}
				}
		
				return Object.defineProperties({}, properties);
			}
		},
	
		addTypeListeners: function({ field }){

			if(this.hasValidProps(field)){

				field.button.addEventListener("click", typeToggler({element: field.input, toggleTypes: field.types}));
			}
			
		},
		
		addSourceListeners: function({ field }){

			if(this.hasValidProps(field)){
				
				field.input.addEventListener("toggling", sourceToggler({element: field.button.firstElementChild, toggleSources: field.sources}));
			}
		},

		hasValidProps: function(fieldProps){
			return (fieldProps.button && fieldProps.input && fieldProps.sources && fieldProps.types)
		}
	}
}