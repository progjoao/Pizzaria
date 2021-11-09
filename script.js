//Auxiliares para cleanCode
const aux = (el)=> document.querySelector(el);
const auxAll = (el)=> document.querySelectorAll(el);

pizzaJson.map((item, index) =>{
    let pizzaItem = aux('.models .pizza-item').cloneNode(true)

    
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('a').addEventListener('click', (el)=>{
        el.preventDefault(el)

        aux('.pizzaWindowArea').style.opacity = 0
        aux('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            aux('.pizzaWindowArea').style.opacity = 1
        }, 200);
     });

    aux('.pizza-area').append( pizzaItem )
});