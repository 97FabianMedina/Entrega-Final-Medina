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

