//variables
let buyThings = []; 
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');

let myArray = ['Buenos dias', 'Buenas tardes', 'Buenas noches', 'Bienvenido a nuestro sitio', 'Un gusto tenerte aqui con nosotros!'];
let rand = ~~(Math.random()*myArray.length);
const rValue = myArray[rand];
console.log(rValue)

let objeto = JSON.parse('{"nombre": "juan", "edad": 33, "casado": false}');

const vaciarCarritoBtn = document.querySelector('#btn-alert');

const boton =document.querySelector("#btn-alert")

boton.addEventListener("click", () => { 
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Se vació tu carrito',
    showConfirmButton: false,
    timer: 1500
})
    buyThings.length = 0;
    priceTotal.innerText = 0;
    loadHtml ();  
    })
    //Swal.fire({
    //    title: 'Are you sure?',
    //    text: "You won't be able to revert this!",
    //    icon: 'warning',
    //    showCancelButton: true,
    //    confirmButtonColor: '#3085d6',
    //    cancelButtonColor: '#d33',
    //    confirmButtonText: 'Yes, delete it!'
    //}).then((result) => {
    //    if (result.isConfirmed) {
    //    Swal.fire(
    //        'Deleted!',
    //        'Your file has been deleted.',
    //       'success'      )
    //    }
    //}) 
//}) 

const usuario = {
    nombre: "Manolo",
    edad: 35,
    autenticado: true
};

let teclados = [ 
    {id: 1, nombre: "productos", precio: 1000 },
    {id: 2, nombre: "tipoElemento", precio: 1500},
    {id: 3, nombre: "datos", precio : 2000},
]

let totalCard = 0;
let countProduct = 0;

//functions

loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--; 
    }

    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}
function clearHtml(){
    containerBuyCart.innerHTML = '';
}

const valor = {
    titulo:"Teclado",
    precio: 20,
}

const valornum = JSON.stringify(valor)

localStorage.setItem ("precio Actual", valornum)

console.log(valornum);

let perfil = JSON.parse(localStorage.getItem('precio Actual'))

console.log(perfil);
