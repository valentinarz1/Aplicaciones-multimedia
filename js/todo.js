
const carrito = document.querySelector('#carrito');
const listaFruver = document.querySelector('#lista-fruver');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//Listeners *****
cargarEventListeners();



function actualizarCantidad(productoId, aumentar) {
    articulosCarrito = articulosCarrito.map(producto => {
        if (producto.id === productoId) {
            if (aumentar) {
                producto.cantidad = Math.min(producto.cantidad + 1, 10); // Máximo de 10
            } else {
                producto.cantidad = Math.max(producto.cantidad - 1, 0); // Mínimo de 0
            }
        }
        return producto;
    });

    carritoHTML(); // Actualizar la interfaz
}
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar todos los contenedores de cantidad
    document.querySelectorAll("#abajo").forEach(function (container) {
        const minusButton = container.querySelector("#minus-button");
        const plusButton = container.querySelector("#plus-button");
        const quantityInput = container.querySelector("input[type='number']");

        // Asegurar que los elementos existen
        if (minusButton && plusButton && quantityInput) {
            // Evento para el botón de restar
            minusButton.addEventListener("click", function () {
                let value = parseInt(quantityInput.value);
                if (value > 0) {
                    quantityInput.value = value - 1;
                }
            });

            // Evento para el botón de sumar
            plusButton.addEventListener("click", function () {
                let value = parseInt(quantityInput.value);
                if (value < 10) { // Ajusta el límite según necesites
                    quantityInput.value = value + 1;
                }
            });
        }
    });
});

function cargarEventListeners () {
    //Cuando agregas un curso presionando 'Agregar al carrito'
    listaFruver.addEventListener('click', agregarFruver);
    //Elimina cursos del carrito
    carrito.addEventListener("click",eliminarFruver);

    //muestra los cursos del storage
    document.addEventListener('DOMContentLoaded', () => {
        //recuerda si no hay productos en el carrito se agrega un array vácio para que no de error.
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoHTML();
    })
    document.addEventListener("DOMContentLoaded", () => {
        // Agregar eventos a los botones dinámicamente
        document.addEventListener("click", function (e) {
            if (e.target.classList.contains("plus-button") || e.target.classList.contains("minus-button")) {
                const productoId = e.target.getAttribute("data-id");
                actualizarCantidad(productoId, e.target.classList.contains("plus-button"));
            }
        });
    });
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

// Funciones ****************************************

function agregarFruver (e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {

        const producto = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        console.log(producto);
        leerDatosFruver(producto);
        productoAgregado(producto);
    }
}
function productoAgregado(producto){
    //Crear una alerta
    const alert = document.createElement("H4");
    alert.style.cssText = "background-color: red; color: white; text-align: center;";
    alert.style.margin = "5px 20px";
    alert.textContent = 'Añadido al carrito'
    producto.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 2000);
}

function eliminarFruver (e) {
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute("data-id");

        //Elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        carritoHTML();
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la información del curso.
function leerDatosFruver (producto) {
    console.log(producto);
    //Crear un objeto con el contenido del curso actual
    const infoFruver = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoFruver.id);
    if (existe) {
        //Creamos una copia del arreglo
        const productos = articulosCarrito.map(producto => {

            if (producto.id === infoFruver.id) {
                producto.cantidad++;
                return producto; // este retorna el objeto actualizado
            } else {
                return producto;// retorna los que no son duplicados
            }
        });
        articulosCarrito = [ ...productos ];

    } else {
        articulosCarrito = [ ...articulosCarrito, infoFruver ];
    }

    //Agregar elementos al carrito  
    carritoHTML();
}



function carritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>  
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <button type="button" class="minus-button" data-id="${producto.id}">-</button>
                <input type="number" value="${producto.cantidad}" min="0" max="10" step="1" disabled>
                <button type="button" class="plus-button" data-id="${producto.id}">+</button>
            </td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}
// Elimina los cursos del tbody
function limpiarHTML () {
    //forma lenta
    //:contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}