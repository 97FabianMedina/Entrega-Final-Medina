class Buscador {
    constructor(productos) {
        this.productos = productos;
    }

    // Método para buscar productos por categoría
    buscarPorCategoria(categoria) {
        const productoFiltrados = this.productos.filter(
            (producto) => producto.categoria === categoria
        );

        return productoFiltrados;
    }

    // Método para buscar productos por codigo
    buscarPorCodigo(codigo) {
        const productoFiltrados = this.productos.filter(
            (producto) => producto.codigo === codigo);

        return productoFiltrados;
    }

    // Método para ordenar productos por precio de forma ascendente
    ordenarPorPrecioAscendente() {
        const productosOrdenados = this.productos
            .slice()
            .sort((elemento1, elemento2) => elemento1.precio - elemento2.precio);
        return productosOrdenados;
    }

    // Método para ordenar productos por precio de forma descendente
    ordenarPorPrecioDescendente() {
        const productosOrdenados = this.productos
            .slice()
            .sort((elemento1, elemento2) => elemento2.precio - elemento1.precio);
        return productosOrdenados;
    }

    //Método para imprimir los productos buscados
    imprimirProductosBuscados(productos) {
        productos.forEach(producto => {
            console.log(`Nombre: ${producto.nombre} - Categoria: ${producto.categoria} - Precio $${producto.precio}`);
        })
    }
}
