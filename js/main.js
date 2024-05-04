// Clase Producto
class Producto {
    constructor(codigo, nombre, precio, cantidad, categoria) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.categoria = categoria;
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    };
    agregarIva(){
        let totalIva = 0;
        this.productos.forEach((objProducto) =>{
            totalIva += (objProducto.precio * objProducto.cantidad) * 0.19; //Iva de colombia 19%
        });
        return totalIva;
    };
    
    vaciarCarrito(){
        this.productos.splice(0, this.productos.length);
        this.productos.push(0);
        return this.productos;
    };
    
    calcularTotal() {
        let total = 0; 
        this.productos.forEach((objProducto) => {
        
        total += objProducto.precio * objProducto.cantidad;
        });
        return total; 
    };

    mostrarProductos() {
        this.productos.forEach((objProducto) => {
            console.log(objProducto.codigo + "      " + objProducto.nombre + "    " + objProducto.precio)
        });
    };
}

// Instancio un nuevo carrito
const carrito = new Carrito();

//Eventos
let botonMas = document.querySelectorAll("div .btn-mas");
// for (const indice of botonMas){
//     console.log(indice.innerText);
// }
let numero = parseInt(document.querySelectorAll("div .cantidad").value);
botonMas.addEventListener("click", () =>{
    numero++;
    document.querySelectorAll("div .cantidad").value = numero;
});

let botonMenos = document.querySelectorAll("div .btn-menos");
botonMenos.addEventListener("click", () =>{
    numero--;
    document.querySelectorAll("div .cantidad").value = numero;
});




