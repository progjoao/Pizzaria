//Auxiliares para cleanCode
const aux = (el)=> document.querySelector(el);
const auxAll = (el)=> document.querySelectorAll(el);

pizzaJson.map((item, index) =>{
    let pizzaItem = aux('.models .pizza-item').cloneNode(true)

    aux('.pizza-area').append( pizzaItem )
});