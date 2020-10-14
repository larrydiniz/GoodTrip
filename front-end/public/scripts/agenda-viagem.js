const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');
const configButton = document.querySelector('button.menu-landing');
const navConfig = document.querySelector('nav#config');

function classToggler({element, toggleClass}){
	const toggling = new Event('toggling');

	return function(){
		const classList = element.classList

	    if(classList.contains(toggleClass)){
			classList.remove(toggleClass);

	    }
	    else{
	        classList.add(toggleClass);
	    }

	    element.dispatchEvent(toggling);
	}
}

/************** config ************/
expandedMenu = () => {
	if(!navConfig.classList.contains("mostrar")){
		navConfig.classList.add("mostrar") 
	} else {
		navConfig.classList.remove("mostrar") 
	}
}

/*************** calendário *************/

/* const datas = new Date('2021-01-07'); */

$(function() {
    $("#calendario" ).datepicker({
        dateFormat: 'yy-mm-dd',
        defaultDate: '2021-01-07',
        endDate: '2021-01-19', 
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
        dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        onSelect: function(date) {
            console.log(date);
        }

});
});

/******** MAIN ******/
menuButton.addEventListener('click', classToggler({element: navMenu, toggleClass: "show"}));