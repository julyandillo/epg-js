import util from "./util.js"

const contenido = document.querySelector('.contenido')

document.addEventListener('DOMContentLoaded', async () => {
    const epg = await util.obtieneEPG()
    const xml = await util.obtieneLogos()

    const logos = util.parseaLogos(xml)
    const canales = util.parseProgramacion(epg)

    for (let canal of canales.values()) {
        canal.setLogo(logos.get(canal.codigo))
        contenido.appendChild(canal.dibuja())
    }
})

// cierra los modal al hacer click fuera del contenido del modal
document.addEventListener('click', (event) => {
    if (event.target.id.startsWith('modal-')) {
        event.target.style.display = 'none'
    }
})