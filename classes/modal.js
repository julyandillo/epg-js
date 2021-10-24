export default class Modal {
    constructor(id) {
        this.modal = document.createElement('div')
        this.modal.classList.add('modal')
        this.modal.id = id
    }

    dibuja(titulo, descripcion, caratula, inicio, fin, duracion) {
        const btnCerrar = document.createElement('span')
        btnCerrar.classList.add('cerrar')
        btnCerrar.innerHTML = `&times;`
        btnCerrar.addEventListener('click', () => {
            this.modal.style.display = 'none'
        })

        const modalHeader = document.createElement('div')
        modalHeader.classList.add('modal-header')
        modalHeader.appendChild(btnCerrar)

        const modalBody = document.createElement('div')
        modalBody.classList.add('modal-body')
        modalBody.innerHTML =
            `<div class="modal-caratula">
                <img src="${caratula}" alt="${titulo}"/>
            </div>
            <div class="modal-detalles">
                <span class="modal-titulo">${titulo}</span>
                <div class="modal-horario">
                    <span>duración: ${duracion} min</span>
                    <span>comienza: ${inicio} | termina: ${fin}</span>
                </div>
                <div class="modal-descripcion">${descripcion}</div>
            </div>`

        const modalContenido = document.createElement('div')
        modalContenido.classList.add('modal-contenido')
        modalContenido.appendChild(modalHeader)
        modalContenido.appendChild(modalBody)

        this.modal.appendChild(modalContenido)

        return this.modal
    }
}