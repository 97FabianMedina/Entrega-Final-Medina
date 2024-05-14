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
const productos = [
    {
        id: "Camisa_Paisaje_1",
        nombre: "Camisa Paisaje",
        descripcion: "La camiseta perfecta para cualquier ocasión.",
        imagen: "Img/Camisas/cam1.jpg",
        precioNormal: 80000,
        precioDescuento: 70000,
        cantidad: 1
    },
    {
        id: "Buzo_Beisbol_1",
        nombre: "Buzo Beisbol",
        descripcion: "La camiseta perfecta para cualquier ocasión.",
        imagen: "Img/Chaquetas/cha1.jpg",
        precioNormal: 140000,
        precioDescuento: 110000,
        cantidad: 1
    },
    {
        id: "Camisa_Moderna_1",
        nombre: "Camisa Moderna",
        descripcion: "La camiseta perfecta para cualquier ocasión.",
        imagen: "Img/Camisas/cam7.jpg",
        precioNormal: 100000,
        precioDescuento: 80000,
        cantidad: 1
    },
    {
        id: "Buzo_de_Lana_1",
        nombre: "Chaqueta de Lana",
        descripcion: "La camiseta perfecta para cualquier ocasión.",
        imagen: "Img/Chaquetas/cha4.jpg",
        precioNormal: 160000,
        precioDescuento: 125000,
        cantidad: 1
    },
    {
        id: "Jeans_Damas_1",
        nombre: "Jeans Damas",
        descripcion: "La camiseta perfecta para cualquier ocasión.",
        imagen: "Img/Jeans/j2.jpg",
        precioNormal: 90000,
        precioDescuento: 60000,
        cantidad: 1
    },
    {
        id: "Buzo_Tortuga_1",
        nombre: "Buzo Tortuga",
        descripcion: "La camiseta perfecta para cualquier ocasión.",
        imagen: "Img/Chaquetas/cha3.jpg",
        precioNormal: 200000,
        precioDescuento: 150000,
        cantidad: 1
    },
    {
        id: "Jeans_Caballero_1",
        nombre: "Jeans Caballero",
        descripcion: "La camiseta perfecta para cualquier ocasión.",
        imagen: "Img/Jeans/j7.jpg",
        precioNormal: 105000,
        precioDescuento: 75000,
        cantidad: 1
    },
    {
        id: "Camisa_Dama_1",
        nombre: "Camisa Dama",
        descripcion: "La camiseta perfecta para cualquier ocasión.",
        imagen: "Img/Camisas/cam8.jpg",
        precioNormal: 65000,
        precioDescuento: 40000,
        cantidad: 1
    }
];

const contenedorProductos = document.querySelector("#contenedor-cards");
let botonesAgregar = document.querySelectorAll(".agregar");
let carritoNumero = document.querySelector("#carrito__numero");
let inputCantidad = document.querySelector("#input__cantidad");
let botonMas = document.querySelectorAll("#btn-mas");
let botonMenos = document.querySelectorAll("#btn-menos");
const carrito = new Carrito();
//Funcion cargar productos
function cargarProductos() {
    productos.forEach((producto) => {
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
                    <input type="text" class="form-control btn-text cantidad" id="input__cantidad_${producto.id}" value=${producto.cantidad} >
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

cargarProductos();
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
    const inputCantidad = e.currentTarget.parentElement.querySelector(`#input__cantidad_${idBoton}`);
    productoAgregado.cantidad = parseInt(inputCantidad.value);

    carrito.agregarProducto(productoAgregado);
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