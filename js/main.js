// import { botonCamisas } from "./utilidades.js";
class Carrito {
    constructor() {
        this.productosCarrito = [];
    }

    agregarProducto(producto) {
        this.productosCarrito.push(producto);
    };
    agregarIva(){
        let totalIva = 0;
        this.productosCarrito.forEach((objProducto) =>{
            totalIva += (objProducto.precio * objProducto.cantidad) * 0.19; //Iva de colombia 19%
        });
        return totalIva;
    };
    
    vaciarCarrito(){
        this.productosCarrito.splice(0, this.productosCarrito.length);
        this.productosCarrito.push(0);
        return this.productos;
    };
    
}
//Objetos productos

const contenedorProductos = document.querySelector("#contenedor-cards");
let botonesAgregar = document.querySelectorAll(".agregar");
let carritoNumero = document.querySelector("#carrito__numero");
let inputCantidad = document.querySelector("#input__cantidad");
let botonMas = document.querySelectorAll("#btn-mas");
let botonMenos = document.querySelectorAll("#btn-menos");
const carrito = new Carrito();
let productos = [];
//Funcion cargar productos
function cargarProductos(productosParaCargar) {
    contenedorProductos.innerHTML = '';
    productosParaCargar.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class="card box">
        <img src=${producto.imagen} class="card-img-top camisas" alt=${producto.id}>
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <div class="main__precios">
                <p class="precios__descuento">$${producto.precioDescuento}</p>
                <p class="precios__normal">$${producto.precioNormal}</p>
            </div>
            <div class="botones">
                <button class="boton agregar" id=${producto.id}>
                    <img src="Img/carrito.png" class="carrito__boton">
                    Agregar
                </button>
                <div class="botones-cantidad">
                    <button type="button" class="btn btn-outline-success  btn-text btn-mas" id="btn-mas">+</button>
                    <input type="text" class="form-control btn-text cantidad" id="input__cantidad_${producto.id}" value=${producto.cantidad} disabled>
                    <button type="button" class="btn btn-outline-success btn-text btn-menos" id="btn-menos">-</button>
                </div>
            </div>
        </div>
        </div>
        `;	
        contenedorProductos.append(div);
    });
    botonesAgregarProducto();
    botonesMasMenos();
};

fetch("../data/productos.json")
.then((resp) =>resp.json())
.then((data) =>{
    productos = data.productos
    cargarProductos(productos);
});
//Filtrar las camisas por cuando se le da click en el boton
function botonCamisas (){
    let botonCamisas = document.querySelector("#btn-camisas");
    botonCamisas.addEventListener("click", filtrarCamisas)
};
function filtrarCamisas(){
    const camisasFiltradas = productos.filter((el) => el.categoria === "Camisas");
    cargarProductos(camisasFiltradas);
};
botonCamisas();

//Filtrar las chaquetas por cuando se le da click en el boton
function botonChaquetas(){
    let botonChaquetas = document.querySelector("#btn-chaquetas");
    botonChaquetas.addEventListener("click", filtrarChaquetas)
};
function filtrarChaquetas(){
    const chaquetasFiltradas = productos.filter((el) => el.categoria === "Chaquetas");
    cargarProductos(chaquetasFiltradas);
};
botonChaquetas();

//Filtrar los jeans por cuando se le da click en el boton
function botonJeans(){
    let botonJeans = document.querySelector("#btn-jeans");
    //colorNegro(botonJeans)
    botonJeans.addEventListener("click", filtrarJeans)
};
function filtrarJeans(){
    const jeansFiltrados = productos.filter((el) => el.categoria === "Jeans");
    cargarProductos(jeansFiltrados);
};
botonJeans();
// function colorNegro(boton){
//     boton.classList.add("linea");
// };

//Funcion botones agregar    
function botonesAgregarProducto(){
    botonesAgregar = document.querySelectorAll(".agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};
//Funcion agregar al carrito
function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto =>producto.id === idBoton
    );
    if(carrito.productosCarrito.some(producto => producto.id === idBoton)){
        const index = carrito.productosCarrito.findIndex(producto => producto.id === idBoton);
        carrito.productosCarrito[index].cantidad++;
    }else{ 
    const inputCantidad = e.currentTarget.parentElement.querySelector(`#input__cantidad_${idBoton}`);
    productoAgregado.cantidad = parseInt(inputCantidad.value);
    carrito.agregarProducto(productoAgregado);
    }
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito.productosCarrito));
    actualizarNumeroCarrito();
};
//Funcion actualizar numero de productos en carrito
function actualizarNumeroCarrito(){
    let nuevoNumero = carrito.productosCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    carritoNumero.innerText = nuevoNumero;
}
//Funcion botones mas y menos en proceso de creacion 
function botonesMasMenos(){
    botonMas = document.querySelectorAll("#btn-mas");
    botonMenos = document.querySelectorAll("#btn-menos");
    botonMas.forEach(boton => {
        boton.addEventListener("click", agregarMas);
    });
    botonMenos.forEach(boton => {
        boton.addEventListener("click", agregarMenos);
    });
};
//Funcion boton mas
function agregarMas(e){
    const idBoton = e.currentTarget.parentElement.parentElement.querySelector(".agregar").id;
    const inputCantidad = e.currentTarget.parentElement.querySelector(`#input__cantidad_${idBoton}`);
    let cantidadProducto = parseInt(inputCantidad.value);
    cantidadProducto++;
    inputCantidad.value = cantidadProducto;
}
//Funcion boton menos
function agregarMenos(e){
    const idBoton = e.currentTarget.parentElement.parentElement.querySelector(".agregar").id;
    const inputCantidad = e.currentTarget.parentElement.querySelector(`#input__cantidad_${idBoton}`);
    let cantidadProducto = parseInt(inputCantidad.value);
    if (cantidadProducto > 1) {
        cantidadProducto--;
        inputCantidad.value = cantidadProducto;
    }
};
