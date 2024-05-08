const nombres = document.querySelectorAll("div .card-title");
const precios = document.querySelectorAll("div .precios__normal");
const cantidades = document.querySelectorAll("div .cantidad");
// for (const cantidad of cantidades){
//     console.log(cantidad.innerText);
// }
for (const indice of nombres){
    console.log(indice.innerText);
}
for (const precio of precios){
    console.log(precio.innerText);
}
cantidades.forEach(cantidad => {
    console.log(cantidad.value);
});






