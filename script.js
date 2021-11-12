//Auxiliares para cleanCode
let cart = [];
let modalQuantity = 1;
let modalKey = 0;

const aux = (el)=> document.querySelector(el);
const auxAll = (el)=> document.querySelectorAll(el);


// listagem das pizzas
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
        modalQuantity = 1;
        modalKey = key;

        aux('.pizzaBig img').src = pizzaJson[key].img;
        aux('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        aux('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        aux('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        aux('.pizzaInfo--size.selected').classList.remove('selected');
        auxAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        });
        
        aux('.pizzaInfo--qt').innerHTML = modalQuantity;


        aux('.pizzaWindowArea').style.opacity = 0;
        aux('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            aux('.pizzaWindowArea').style.opacity = 1;
        }, 200);
     });

    aux('.pizza-area').append( pizzaItem );
});

// EVENTOS DO MODAL
function closeModal() {
    aux('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        aux('.pizzaWindowArea').style.display = 'none';
    }, 500)
};
auxAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
})

aux('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQuantity > 1){
        modalQuantity--;
        aux('.pizzaInfo--qt').innerHTML = modalQuantity;
    }
});
aux('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQuantity++;
    aux('.pizzaInfo--qt').innerHTML = modalQuantity;
});
auxAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (el)=>{
        aux('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
aux('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(aux('.pizzaInfo--size.selected').getAttribute('data-key'))
    // let size = aux('.pizzaInfo--size.selected').getAttribute('data-key');
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=> item.identifier == identifier)
    
    if(key > -1){
        cart[key].qt += modalQuantity;
    }else {
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQuantity
        }) 
    };
    updateCart();
    closeModal();
});

aux('.menu-openner span').addEventListener('click', () => {
    if(cart.length > 0) {
        aux('aside').style.left = '0'
    }
});
aux('.menu-closer').addEventListener('click', () => {
    aux('aside').style.left = '100vw';
});

function updateCart() {
    aux('.menu-openner span').innerHTML = cart.length;
 
    if(cart.length > 0){
        aux('aside').classList.add('show');
        aux('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;
            
            let cartItem = aux('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2: 
                    pizzaSizeName = 'G'; 
                    break;
            }

            
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart()
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++
                updateCart()
            });

            aux('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        aux('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)};`
        aux('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)};`
        aux('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)};`

    }else {
        aux('aside').classList.remove('show')
        aux('aside').style.left = '100vw'

    }
}

