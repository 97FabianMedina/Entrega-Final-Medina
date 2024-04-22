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

// Agrego 5 productos de la clase Producto
const producto1 = new Producto(1, "Camisa", 50000, 1, "Camisas");
const producto2 = new Producto(2, "Pantalón", 70000, 2, "Jeans");
const producto3 = new Producto(3, "Chaqueta", 100000, 2, "Chaquetas");
const producto4 = new Producto(4, "Camiseta", 60000, 3, "Camisas");
const producto5 = new Producto(5, "Short", 40000, 5, "Jeans");

// Instancio un nuevo carrito
const carrito = new Carrito();

// Agrego los productos al carrito
carrito.agregarProducto(producto1);
carrito.agregarProducto(producto2);
carrito.agregarProducto(producto3);
carrito.agregarProducto(producto4);
carrito.agregarProducto(producto5);

console.log("Codigo Nombre " + "  " + " Precio")
// Muestra los productos en consola
carrito.mostrarProductos();

// Pide al usuario ingresar la cantidad de productos a comprar
let cantidadProductos = parseInt(prompt("Digite cuantos de los productos de la lista desea comprar"));

// Valida la información ingresada por el usuario "cantidadProductos"
if (!isNaN(cantidadProductos) && cantidadProductos > 0 && cantidadProductos <= 5) {
    let totalPrecio = 0; // Variable para almacenar el precio total de los productos seleccionados

    // for para solicitar y calcular el precio de los productos seleccionados
    for (let i = 0; i < cantidadProductos; i++) {
        let codigoProducto = parseInt(prompt("Ingrese el código del producto " + (i + 1) + " que desea comprar"));

        // Validar que el código de producto esté en el rango válido (1-5)
        if (codigoProducto >= 1 && codigoProducto <= 5) {
            let cantidadProducto = parseInt(prompt("Ingrese la cantidad del producto con código " + codigoProducto + " que desea comprar"));

            // Buscar el producto en el carrito por su código
            let productoSeleccionado = carrito.productos.find(producto => producto.codigo === codigoProducto);

            // Si se encuentra el producto y la cantidad es válida, calcular su precio y sumarlo al total
            if (productoSeleccionado && cantidadProducto > 0) {
                totalPrecio += productoSeleccionado.precio * cantidadProducto;
            } else {
                alert("Cantidad incorrecta para el producto seleccionado.");
                break;
            }
        } else {
            alert("Código de producto incorrecto.");
            break;
        }
    }

    // Mostrar el precio total de los productos seleccionados
    alert("El precio neto a pagar por los " + cantidadProductos + " productos es de $" + totalPrecio + " mil  pesos colombianos");
} else {
    alert("Cantidad de productos incorrecta. Solo puede comprar entre 1 y 5 productos.");
}

