const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
const carritoVacio = document.querySelector("#carrito-vacio");
const contenedorPorductosCarrito = document.querySelector("#contenedor-cards-carrito");
const totalCarrito = document.querySelector("#total-carrito");

console.log(productosEnCarrito);
if(productosEnCarrito){
    carritoVacio.classList.add("disabled");

    productosEnCarrito.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto-carrito");
        div.innerHTML = `
        <div class="card mb-3 card-carrito">
            <div class="row g-0">
                <div class="col-md-2">
                    <img src=../${producto.imagen} class="img-fluid rounded-start" alt="...">
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
                        <button type="button" class="btn btn-outline-success  btn-text btn-mas-carrito">+</button>
                        <input type="text" class="form-control btn-text cantidad-carrito" value=${producto.cantidad} disabled>
                        <button type="button" class="btn btn-outline-success btn-text btn-menos-carrito">-</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="precios-carrito">
                        <h5>Precio</h5>
                        <p class="precio-carrito">$${producto.precioDescuento}</p>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="contenedor-subtotal">
                        <h5>SubTotal</h5>
                        <p class="subtotal_carrito">$${producto.precioDescuento * producto.cantidad}</p>

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
    
}else{
    carritoVacio.innerText = "No hay productos en el carrito";
}

    let total = productosEnCarrito.reduce((total, producto) => total + producto.cantidad * producto.precioDescuento, 0);
    totalCarrito.innerText = `$${total}`;
