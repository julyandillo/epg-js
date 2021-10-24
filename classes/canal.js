import Evento from "./evento.js";
import Modal from "./modal.js";

export default class Canal {
    constructor(nombreCompleto) {
        [this.nombre, this.tipo] = nombreCompleto.split('.')
        this.eventos = []
        this.eventoActual = undefined
        this.codigo = nombreCompleto
        this.logo = ''
    }

    tieneEventoActual() {
        return this.eventoActual !== undefined
    }

    setEventoActual(evento) {
        this.eventoActual = evento
    }

    agregarEvento(evento) {
        this.eventos.push(evento)
    }

    setLogo(logo) {
        this.logo = logo
    }

    dibuja() {
        const divEl = document.createElement('div')
        divEl.id = this.codigo
        divEl.classList.add('canal')
        divEl.innerHTML =
            `<div class="canal-cabecera">
                <div class="canal-logo"><img src="${this.logo}" alt="${this.nombre}" /></div>
                <div class="evento-titulo">${this.eventoActual.titulo}</div>
            </div>
            <div class="evento-horario">
                <div class="evento-inicio" data-time="${this.eventoActual.inicio_time}">${this.eventoActual.horaInicio()}</div>
                <div class="evento-fin" data-time="${this.eventoActual.fin_time}">${this.eventoActual.horaFin()}</div>
            </div>
            <div class="progreso"><div class="progreso-evento" style="width: ${this.eventoActual.progreso()}%"></div></div>
            <div class="siguiente-evento">después: ${this.eventos[0].titulo}</div>
            `

        const modalDetalles = new Modal('modal-' + this.codigo)
        const modalDetallesEl = modalDetalles.dibuja(this.eventoActual.titulo, this.eventoActual.descripcion,
            this.eventoActual.imagen, this.eventoActual.horaInicio(), this.eventoActual.horaFin(), this.eventoActual.duracion())

        divEl.onclick = () => {
            modalDetallesEl.style.display = 'block'
        }
        divEl.appendChild(modalDetallesEl)

        return divEl
    }

}