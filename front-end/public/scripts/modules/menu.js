export default function menu(classToggler){

    return {
        defineMenu: function(menu){
			
            if(this.hasValidProps(menu)){
    
                const properties = {
                    openButton: { value: menu.openButton,
                                    writable: false },
                                    
                    content: { value: menu.content,
                                writable: false },
                                    
                    visibilityClass: { value: menu.visibilityClass,
                                        writable: false }
                }
                
                /** Immutable modal object **/
        
                return Object.defineProperties({}, properties);
            }
        },

        addOpenedListeners: function({ menu }){
            if(this.hasValidProps(menu)){
	
				menu.openButton.addEventListener("click", classToggler({element: menu.content, toggleClass: menu.visibilityClass}));
			}
        },
        
        hasValidProps: function(menu){
			if(menu.openButton && menu.content && menu.visibilityClass){
	
				return true;
			}
			else{
	
				return false;
			}
		}

    }
}