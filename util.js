import Config from "./config.js"
import Canal from "./classes/canal.js";
import Evento from "./classes/evento.js";

const util = {
    obtieneEPG: async () => {
        const response = await fetch(Config.URL_EPG_JSON)
        return response.json()
    },

    parseProgramacion: function(json) {
        const canales = new Map()

        for (let canalJSON of json) {
            if (!canalJSON.name.endsWith('.TV')) {
                continue
            }

            let canal = new Canal(canalJSON.name)
            for (let eventoJSON of canalJSON.events) {
                // los eventos que ya se han terminado no nos interesan
                // el now devuelve el tiempo en milisegundos
                if (Date.now() > (eventoJSON.hf * 1000)) {
                    continue
                }

                let evento = new Evento(eventoJSON.t, eventoJSON.hi, eventoJSON.hf, eventoJSON.d, eventoJSON.c)

                canal.tieneEventoActual() ? canal.agregarEvento(evento) : canal.setEventoActual(evento)
            }

            if (canal.eventos.length > 0) {
                canales.set(canalJSON.name, canal)
            }
        }
        return canales;
    },

    formateaFecha: function(fecha) {
        return `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`
    },

    horaFormateada: function(fecha) {
        return fecha.getHours().toString().padStart(2, '0') + ':' + fecha.getMinutes().toString().padStart(2, '0');
    },

    obtieneLogos: async () => {
        const respose = await fetch(Config.URL_EPG_XML)
        return respose.text()
    },

    parseaLogos: function(xml) {
        const parser = new DOMParser()
        const xmlParser = parser.parseFromString(xml, 'text/xml')
        const logos = new Map()
        Array.from(xmlParser.getElementsByTagName('channel')).forEach(canal => {
            let logo = canal.getElementsByTagName('icon')[0]
            // algunos canales no tienen logo
            logos.set(canal.getAttribute('id'), logo ? logo.getAttribute('src') : '')
        })

        return logos
    }
}

export default util