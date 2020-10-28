const menuButton = document.querySelector('button.menu-landing');
const navMenu = document.querySelector('nav#menu');
const configButton = document.querySelector('button.menu-landing');
const navConfig = document.querySelector('nav#config');

/********************************************* config ********************************************************/
expandedMenu = () => {
	if(!navConfig.classList.contains("mostrar")){
		navConfig.classList.add("mostrar") 
	} else {
		navConfig.classList.remove("mostrar") 
	}
}

/********************************************* calendário *******************************************************/
const inicio = "2021-01-07";
const termino = "2021-01-20"

class Calendario {
	constructor(id){
		const dataInicial = 
		this.cells = [];
		this.dataSelecionada = null;
		this.calendar = document.getElementById(id);
		this.mostrarTemplate();
		this.gridBody = this.calendar.querySelector('.grid#body');
		this.selectedDay = document.querySelector('.dia-selecionado');
		this.mostrarDias();	
	}

	mostrarTemplate() {
		this.calendar.innerHTML = this.getTemplate();
	}
	
	getTemplate(){
		let template = `
		<div id="body">
		<div class="grid">
			<div class="grid" id="header">
				<span class="grid-cell dia-semana">D</span>
				<span class="grid-cell dia-semana">S</span>
				<span class="grid-cell dia-semana">T</span>
				<span class="grid-cell dia-semana">Q</span>
				<span class="grid-cell dia-semana">Q</span>
				<span class="grid-cell dia-semana">S</span>
				<span class="grid-cell dia-semana">S</span>
			</div>
			<div class="grid" id="body">
			
			</div>
		</div>
	</div>
	`;

	return template;
	}

	mostrarDias(){
		this.cells = this.generateDates(moment(inicio));

		if(this.cells === null){
			console.error("não foi possível gerar as datas");
			return;
		}

		this.gridBody.innerHTML = '';
		let templateDia = '';
		let desabilitarClasse = '';
		let periodoViagem = '';

		for (let i = 0; i < this.cells.length; i++){
			desabilitarClasse = '';
			periodoViagem = '';

			if(!this.cells[i].isInCurrentMonth){
				desabilitarClasse = 'disabled';
			}

			if(this.cells[i].isInPeriodTrip){
				if(this.cells[i].isInitialDay){
					periodoViagem = 'period selected';
					this.selectedDay.innerHTML = `${this.cells[i].date.date()}`;
				} else {
					periodoViagem = 'period';
				}
			}
			
			templateDia += `
			<span class="grid-cell dia ${desabilitarClasse} ${periodoViagem}" data-id="${i}">
				${this.cells[i].date.date()}
			</span>
			`;
			/* console.log(this.cells[i]); */
		}

		this.gridBody.innerHTML = templateDia;
		this.diaSelecionado();

	}

	generateDates(mes = moment()){
		if(!moment.isMoment(mes)){
			return null;
		}

		let inicioViagem = moment(inicio).subtract(1, 'days');
		let fimViagem = moment(termino).add(1, 'days');

		let diaInicial = moment(mes).startOf('month');
		let diaFinal = moment(mes).endOf('month');
		let cells = [];

		while (diaInicial.day() !== 0){ /* o dia é diferente de domingo? */
			diaInicial.subtract(1, 'days'); /*voltar um dia */
		}

		while (diaFinal.day() !== 6){ /* o dia é diferente de sábado? */
			diaFinal.add(1, 'days'); /*adiantar um dia */
		}

		/* Gera os dias do calendário*/
		do{
			cells.push({
				date: moment(diaInicial), 
				isInCurrentMonth: diaInicial.month() === mes.month(),
				/* verifica se o dia inicial pertence ao mês*/
				isInPeriodTrip: diaInicial.isBetween(inicioViagem, fimViagem),
				/* verifica se o dia inicial pertence ao periodo da viagem*/
				isInitialDay: diaInicial.date() === moment(inicio).date()
				/* verifica se o dia inicial é o dia 1 da viagem*/
			});

			diaInicial.add(1, 'days');	
		} while(diaInicial.isSameOrBefore(diaFinal));

		console.log(cells);
		return cells;
	}

	diaSelecionado(){
		let dias = this.calendar.querySelectorAll('.dia');

		dias.forEach(dia => {
			dia.addEventListener('click', e => {
				let target = e.target;

				if (target.classList.contains('disabled') || target.classList.contains('selected') 
						|| (!target.classList.contains('period'))) {
                    return;
				}
				
				/* desselecionar dia anterior */
				let diaSelecionado = this.gridBody.querySelector('.selected');
				if (diaSelecionado) {
					diaSelecionado.classList.remove('selected')
				}
				/* selecionar novo dia */
				target.classList.add('selected');

				/* console.log(this.cells[target.dataset.id].date.date()) */

				this.diaSelecionado = this.cells[target.dataset.id].date;

				/* div do dia selecionado*/
				this.selectedDay.innerHTML = `${this.diaSelecionado.date()}`;

				/* change */
				this.calendar.dispatchEvent(new Event('change'));				
			})
		})
	}

	getElement(){
		return this.calendar;
	}

	value(){
		return this.diaSelecionado;
	}
}

/************************************************ MAIN *****************************************************/
menuButton.addEventListener('click', classToggler({element: navMenu, toggleClass: "show"}));