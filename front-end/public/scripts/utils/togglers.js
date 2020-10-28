function classToggler({element, toggleClass}){
	
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

function typeToggler({element, toggleTypes}){
	
	return function(event){
		
		if(element.type == toggleTypes.primary){
			
			element.type = toggleTypes.secondary;

			element.dispatchEvent( new CustomEvent('toggling', { state: 1 }));
	    }
	    else{
			
			element.type = toggleTypes.primary;

			element.dispatchEvent( new CustomEvent('toggling', { state: 0 }));
	    }
	}
}

function sourceToggler({element, toggleSources}){

	return function(event){
		if(event.state){

			element.src = toggleSources.primary;
		}
		else{

			element.src = toggleSources.secondary;
		}

		element.dispatchEvent(new Event('sourceToggling'));
	}
}