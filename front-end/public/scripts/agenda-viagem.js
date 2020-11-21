import menu from './modules/menu.js';
import { classToggler } from './utils/togglers.js';
import urlParser from './modules/urlParser.js';
import taskCards from './modules/taskCards.js';
import getTravelTasks from './requests/getTravelTasks.js';
import getTravel from "./requests/getTravel.js";
import gtHeaders from './requests/gtHeaders.js'


const membersLink = document.querySelector('a#link-membros');
const bagLink = document.querySelector('a#link-mala');
const configButton = document.querySelector('button.configuracoes');
const configNav = document.querySelector('nav#config');
const adicionar = document.querySelector('.btn-adicionar');
const diaSemana = document.getElementById('dia-semana');

/********************************************* calendário *******************************************************/
var inicio;
var termino;
var selecionado;
var dia = inicio;

class Calendario {
	constructor(id){
		const dataInicial = 
			this.cells = [];
			this.dataSelecionada = null;
			this.calendar = document.getElementById(id);
			this.mostrarTemplate();
			this.gridBody = this.calendar.querySelector('.grid#body');
			this.selectedDay = document.getElementById('dia-numero');
			this.selectedDayWeek = document.getElementById('dia-semana')
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

					selecionado = ((this.cells[i].date).format('dddd'));
					this.selectedDayWeek.innerHTML = `${selecionado}`

					adicionar.href = `nova-tarefa.html?${viagem}&day=${inicio}`

					dia = (this.cells[i].date).format('YYYY-MM-DD');

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

				this.diaSelecionado = this.cells[target.dataset.id].date;

				/* div do dia selecionado*/
				this.selectedDay.innerHTML = `${this.diaSelecionado.date()}`;


				/* change */
				this.calendar.dispatchEvent(new Event('change'));	
				
				/* console.log(this.cells[target.dataset.id].date.date()) */
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
const mnu = menu(classToggler);
const urlp = urlParser();

const travelId = urlp.mapVariables(location.href).travel_id;

const configMenu = mnu.defineMenu({ openButton: configButton,
	                                content: configNav,
									visibilityClass: "mostrar" });
									
mnu.addOpenedListeners({ menu: configMenu });

const blocoTarefas = document.querySelector('div.tarefas');
const templateTarefas = document.getElementById('t-tarefa');

const viagem = location.href.split("?")[1];

var calendario = new Calendario('calendar');

window.addEventListener('load', () => {
	const request = getTravel(gtHeaders.authorized(), travelId)
	fetch(request.url, request.init)
		.then(res => res.json())
		.then(data => {
			console.log("CHEGUEI AQUI ")
			inicio = `${data.inicio}`
			termino = `${data.termino}`
			calendario = new Calendario('calendar');
		});
});

function fetchTarefas() {
	
	const request = getTravelTasks(gtHeaders.authorized(), dia, travelId)

	fetch(request.url, request.init)
		.then(res => res.json())
		.then(json => Array.isArray(json)? json.map(tarefa => taskCards().buildCard(templateTarefas, tarefa)): false)
		.then(cards => cards? cards.forEach(card => blocoTarefas.appendChild(card)): blocoTarefas.innerText = "Nenhuma tarefa..." )
		
}

calendario.getElement().addEventListener('change', e => {
	dia = calendario.value().format('YYYY-MM-DD');
	selecionado = (calendario.value()).format('dddd');

	/* mudanças dinâmicas */
	diaSemana.innerHTML = `${selecionado}`;
	adicionar.href = `nova-tarefa.html?${viagem}&day=${dia}`

	blocoTarefas.innerHTML = '';
	/* console.log("id=" + travelId) */
	/*console.log(dia)*/
	/* console.log("url =" + urlp.mapVariables(location.href)); */
	fetchTarefas();
})

membersLink.href += `?travel_id=${travelId}`;
bagLink.href += `?travel_id=${travelId}`;

fetchTarefas();

