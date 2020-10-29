export function classToggler({element, toggleClass}){
	
	return function(event){
		const classList = element.classList;
		
	    if(classList.contains(toggleClass)){
			classList.remove(toggleClass);
			
	    }
	    else{
			classList.add(toggleClass);
	    }
		
	    element.dispatchEvent(new Event('toggling'));
	}
}

export function typeToggler({element, toggleTypes}){
	
	return function(event){
		
		if(element.type == toggleTypes.primary){
			
			element.type = toggleTypes.secondary;

			element.dispatchEvent( new CustomEvent('toggling', { detail: 1 }));
	    }
	    else{
			
			element.type = toggleTypes.primary;

			element.dispatchEvent( new CustomEvent('toggling', { detail: 0 }));
	    }
	}
}

export function sourceToggler({element, toggleSources}){

	return function(event){
		if(event.detail){

			element.src = toggleSources.primary;
		}
		else{

			element.src = toggleSources.secondary;
		}

		element.dispatchEvent(new Event('sourceToggling'));
	}
}