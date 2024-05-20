const productosEnCarrito = JSON.parse(
    localStorage.getItem("productos-en-carrito")
);
const carritoVacio = document.querySelector("#carrito-vacio");
const contenedorPorductosCarrito = document.querySelector(
    "#contenedor-cards-carrito"
);
const totalCarrito = document.querySelector("#total-carrito");
let carritoNumero = document.querySelector("#carrito__numero");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const comprarCarrito = document.querySelector("#comprar-carrito");
//Actualizar numero en carrito
let nuevoNumero = productosEnCarrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
);
carritoNumero.innerText = nuevoNumero;

// Condicion para saber si hay o no productos en el carrito 
if (productosEnCarrito) {
// Cargar productos en carrito
    productosEnCarrito.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto-carrito");
        div.innerHTML = `
        <div class="card mb-3 card-carrito">
            <div class="row g-0">
                <div class="col-md-2">
                    <img src=../${producto.imagen
            } class="imagen-tamano" alt="...">
                </div>
                <div class="col-md-3">
                    <div class="card-body contenido-carrito">
                        <h5 class="card-title titulo">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                    </div>
                </div>
                <div class="col-md-2 botones-carrito">
                    <h5 class="cantidad_text">Cantidad</h5>
                    <div class="botones-cantidad-carrito">
                        <input type="text" class="form-control btn-text cantidad-carrito" value=${producto.cantidad} disabled>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="precios-carrito">
                        <h5>Precio</h5>
                        <p class="precio-carrito">$${producto.precioDescuento
            }</p>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="contenedor-subtotal">
                        <h5>SubTotal</h5>
                        <p class="subtotal_carrito">$${producto.precioDescuento * producto.cantidad
            }</p>

                    </div>
                </div>
                <div class="col-md-1">
                    <div class="contenedor-basura">
                        <button type="button" class="btn "><img src="../Img/basura.png" class="basura"
                                alt="logo-basura"></button>
                    </div>
                </div>
            </div>
        </div> 
        `;
        contenedorPorductosCarrito.append(div);
    });
} else {
    carritoVacio.innerText = "No hay productos en el carrito";
}
// Calcular el total
let total = productosEnCarrito.reduce(
    (total, producto) => total + producto.cantidad * producto.precioDescuento,
    0
);
totalCarrito.innerText = `$${total}`;

// Vaciar carrito de compras
vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: "¿Estas seguro de Vaciar el carrito?",
        text: "Despues de borrar los productos tienes que agregarlos de nuevo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "si, Vaciar"
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: "Carrito Vacio",
            text: "Tu carrito de compras esta vacio",
            icon: "success"
        });
        localStorage.removeItem("productos-en-carrito");
        setTimeout(() => {
            location.reload();
        }, 2000);
        }
    });
    


});


// Comprar carrito de compras
    comprarCarrito.addEventListener("click", () => {
        Swal.fire({
            title: "Compra Exitosa!",
            icon: "success",
            showConfirmButton: false,
        }); 
        localStorage.removeItem("productos-en-carrito");
        setTimeout(() => {
            location.reload();
        }, 2000);
    });
    

