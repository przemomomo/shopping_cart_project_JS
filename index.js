// import "core-js/actual/array/group-by";

const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-container");

const total = document.querySelector(".total-items-in-cart")

// const products=[]
// fetch('https://dummyjson.com/products')
//   .then(res => res.json())
//   .then(data => data.products.forEach((item)=>products.push(item)))
// console.log(products)

function renderProdcuts() {
  productsEl.innerHTML = ''
  products.forEach((product) => {
    productsEl.innerHTML += `
    
      <div class="item-container flex col">
                <div class="item-text flex col border" >
                    <div class="product-name">${product.title}</div>
                    <div class="product-brand">${product.brand}</div>
                    <div class="product-description">${product.description}</div>
                </div>
                <div class="item-panel flex border">
                    <div class="price-container"><p>${product.price}$</p></div>
                    <div class="amount-container border"><p>${(product.amount===undefined ? product.amount=1 : product.amount)}</p></div>
                    <div class="plus-minus-container flex col border">
                    <div class="plus border" onclick="renderProductAmount(${product.id})">+</div>
                    <div class="minus" onclick="renderProductAmount2(${product.id},'minus')"">-</div>
                    </div>
                    <div class="purchase-container" onclick= "addToCart(${product.id},${product.amount},'${product.brand}')">BUY</div>
                </div>
            </div>
          `;
  });


}

renderProdcuts();

function renderProductAmount(id, action) {
  for (const i of products) {
    if (i.id === id) {
      if (i.amount) {
        i.amount++
      } else {
        i.amount = 2
      }
    }
  }

  renderProdcuts()
}

function renderProductAmount2(id) {
  for (const i of products) {
    if (i.id === id) {
      if (i.amount && i.amount > 1) {
        i.amount--
      } else {
        i.amount = 1
      }
    }
  }
  renderProdcuts()
}



let cart = []





function addToCart(id, amount, brand) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id, amount);

  }
  // if (cart.some((item) => item.brand === brand)) {
  //   console.log('ggg')}
  else {
    const item = products.find((product) => product.id === id)
    // console.log(item)
    cart.push({
      ...item,
      numberOfUnits: amount,
    })
  }
  updateCart()
}

function updateCart() {
  
  // console.log(cart)
  groupByFunction();
  // console.log(cart)
  // renderCartItems();
  renderTotal();
  // console.log(cart)
}

function groupByFunction() {
const groupByBrand = cart.reduce((group, product) => {
  const { brand } = product;
  group[brand] = group[brand] ?? [];
  group[brand].push(product);
  return group;
}, {});
// console.log(groupByBrand);
// cart.push(groupByBrand)
cartItemsEl.innerHTML = ''
let brands=[]
for(let key in groupByBrand){
  // console.log(`${key}: ${groupByBrand[key]}`)
  groupByBrand[key].forEach((item)=>{
    
   
    console.log(item.brand)
    console.log(brands)
    if(brands.includes(item.brand)){
    cartItemsEl.innerHTML+=`
 

    <div class="cart-item flex">
      
    <div class="cart-product-details flex border">
        
        <div class="cart-product-name">${item.title}</div>
        <div class="cart-product-price">${item.price}$</div>
        <div class="cart-product-amount">${item.numberOfUnits}</div>
        <div class="plus-minus-container flex col border">
            <div class="plus border" onclick="changeNumberOfUnits('plus', ${item.id},1)">+</div>
            <div class="minus" onclick="changeNumberOfUnits('minus', ${item.id},1)">-</div>
        </div>
    </div>
    <div class="delete-container" onclick="removeItemFromCart(${item.id})">DELETE</div>
</div>

    `

  }else{
      cartItemsEl.innerHTML+=`
 
      <div>${item.brand}  </div>
      <div class="cart-item flex">
        
      <div class="cart-product-details flex border">
          
          <div class="cart-product-name">${item.title}</div>
          <div class="cart-product-price">${item.price}$</div>
          <div class="cart-product-amount">${item.numberOfUnits}</div>
          <div class="plus-minus-container flex col border">
              <div class="plus border" onclick="changeNumberOfUnits('plus', ${item.id},1)">+</div>
              <div class="minus" onclick="changeNumberOfUnits('minus', ${item.id},1)">-</div>
          </div>
      </div>
      <div class="delete-container" onclick="removeItemFromCart(${item.id})">DELETE</div>
  </div>
  
      `
      brands.push(item.brand)
    }

  
  })
}
console.log()

}


function renderTotal() {
  let totalPrice = 0
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    console.log(totalPrice);

    totalItems += item.numberOfUnits;
  });

  total.innerHTML = `Grand total: ${totalPrice.toFixed(2)}$`;
}

function renderCartItems() {
  cartItemsEl.innerHTML = ''
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item flex">
      
                <div class="cart-product-details flex border">
                    
                    <div class="cart-product-name">${item.title}</div>
                    <div class="cart-product-price">${item.price}$</div>
                    <div class="cart-product-amount">${item.numberOfUnits}</div>
                    <div class="plus-minus-container flex col border">
                        <div class="plus border" onclick="changeNumberOfUnits('plus', ${item.id},1)">+</div>
                        <div class="minus" onclick="changeNumberOfUnits('minus', ${item.id},1)">-</div>
                    </div>
                </div>
                <div class="delete-container" onclick="removeItemFromCart(${item.id})">DELETE</div>
            </div>
        `
  })
}


function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

function changeNumberOfUnits(action, id, amount) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.stock) {
        numberOfUnits += amount;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
// update