//Auxiliares para cleanCode
const aux = (el)=> document.querySelector(el);
const auxAll = (el)=> document.querySelectorAll(el);

pizzaJson.map((item, index) =>{
    let pizzaItem = aux('.models .pizza-item').cloneNode(true)

    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (el)=>{
        el.preventDefault(el);
        let key = el.target.closest('.pizza-item').getAttribute('data-key')
        // console.log(pizzaJson[key])

        aux('.pizzaBig img').src = pizzaJson[key].img
        aux('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        aux('.pizzaInfo--desc').innerHTML = pizzaJson[key].description

        aux('.pizzaWindowArea').style.opacity = 0;
        aux('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            aux('.pizzaWindowArea').style.opacity = 1;
        }, 200);
     });

    aux('.pizza-area').append( pizzaItem );
});