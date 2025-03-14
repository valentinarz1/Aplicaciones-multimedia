const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

document.addEventListener('DOMContentLoaded', () => {
    //recuerda si no hay productos en el carrito se agrega un array vácio para que no de error.
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cargarCarrito();
})

//Vaciar carrito
vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
});

function cargarCarrito(){
    let artCarrito = JSON.parse(localStorage.getItem("carrito"));

    console.log("Cargando carrito desde localStorage:", artCarrito);

    artCarrito.forEach(articulo => {
        console.log("Pintando producto:", articulo);
    });

    artCarrito.forEach(articulo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>  
                <img src="${ articulo.imagen }" width=100>
            </td>
            <td>${ articulo.titulo }</td>
            <td>${ articulo.precio }</td>
            <td>${ articulo.cantidad } </td>
            <td>${ articulo.unidad } </td>
            <td>
                <a href="#" class="borrar-item" data-id="${ articulo.id }">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });

}

// Elimina los cursos del tbody
function limpiarHTML () {
    //forma lenta
    //:contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

    localStorage.removeItem("carrito");
}

function eliminarItem (e) {
    if (e.target.classList.contains('borrar-item')) {
        const itemId = e.target.getAttribute("data-id");

        //Elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(item => item.id !== itemId);
    }
}

