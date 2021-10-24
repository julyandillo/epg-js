import util from "../util.js";

export default class Evento {
    constructor(titulo, inicio, fin, descripcion, imagen) {
        this.logo = ''
        this.titulo = titulo
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        this.inicio = new Date(inicio * 1000)
        this.fin = new Date(fin * 1000)
        this.descripcion = descripcion
        this.imagen = imagen
        this.inicio_time = inicio
        this.fin_time = fin
    }

    inicioFormateado() {
        return util.formateaFecha(this.inicio)
    }

    finFormateado() {
        return util.formateaFecha(this.fin)
    }

    horaInicio() {
        return util.horaFormateada(this.inicio)
    }

    horaFin() {
        return util.horaFormateada(this.fin)
    }

    duracion() {
        return (this.fin_time - this.inicio_time) / 60
    }

    progreso() {
        // siempre en minutos
        let duracion = (this.fin_time - this.inicio_time) / 60
        let progreso = ((Date.now()/1000) - this.inicio_time) / 60

        return Math.floor(100*progreso/duracion)
    }
}