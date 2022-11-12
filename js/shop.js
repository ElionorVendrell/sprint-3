const products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];
const cartList = [];

const cart = [];

let total = 0;

// Exercise 1
function buy(id) {
  const item = products.find((e) => id === e.id);
  cartList.push(item);
  generateCart();
}

// Exercise 2
function cleanCart() {
  while (cart.length > 0) {
    cart.pop();
  }
  while (cartList.length > 0) {
    cartList.pop();
  }
  generateCart();
  calculateTotal();
  printCart();
  console.log(cart);
}

// Exercise 3

function calculateTotal() {
  total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].subtotalWithDiscount;
  }
}

// Exercise 4
function generateCart() {
  cart.length = 0;
  for (let i = 0; i < cartList.length; i++) {
    let productFound = cart.find((e) => e.id === cartList[i].id);
    if (!productFound) {
      let newProductToAddToCart = { ...cartList[i] };
      newProductToAddToCart.quantity = 1;
      cart.push(newProductToAddToCart);
    } else if (productFound) {
      productFound.quantity++;
      productFound.subtotal += productFound.price;
    }
  }
  document.getElementById("count_product").innerHTML = cartList.length;
  applyPromotionsCart();
  calculateTotal();

  console.log(cart);
  console.log(cartList);
  console.log(total);
}

// Exercise 5
function applyPromotionsCart() {
  for (let i = 0; i < cart.length; i++) {
    let discount = cart[i].offer;
    let cantidad = cart[i].quantity;
    if (discount && cantidad >= cart[i].offer.number) {
      const price = cart[i].price * cantidad;
      const percent = cart[i].offer.percent;
      const discountPercent = (price * percent) / 100;
      cart[i].subtotalWithDiscount = price - discountPercent;
      cart[i].subtotal = price;
    } else {
      const price = cart[i].price * cantidad;
      cart[i].subtotal = price;
      cart[i].subtotalWithDiscount = price;
    }
  }
}

// Exercise 6
function printCart() {
  document.getElementById("cart_list").innerHTML = `<thead>
  <tr>
    <th scope="col">Product</th>
    <th scope="col">Price</th>
    <th scope="col">Qty.</th>
    <th scope="col">Total <small>(with discount)</small></th>
  </tr>
  </thead>`;
  let cartLength = 0;
  for (i = 0; i < cart.length; i++) {
    document.getElementById("cart_list").innerHTML += `<tr>
    <th scope="row">${cart[i].name}</th>
    <td>${cart[i].price}</td>
    <td>${cart[i].quantity}</td>
    <td>${
      cart[i].subtotalWithDiscount
        ? cart[i].subtotalWithDiscount
        : cart[i].subtotal
    }</td> 
    <td> 
    <img class= "btn" 
    alt="imagen papelera" 
    onclick="removeFromCart(${cart[i].id})" 
    src="images/trash.svg">
    </td> 
</tr>`;
    cartLength += cart[i].quantity;
  }
  document.getElementById("count_product").innerHTML = cartLength;
  document.getElementById("total_price").innerHTML = total + "€";
}

// ** Nivell II **

// Exercise 7 REFACTORIZAR

/* function addToCart(id) {
  let productClone;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      productClone = { ...products[i] };
    }
  }

  const findProduct = cart.find((e) => id === e.id);
  if (!findProduct) {
    findProduct.cantidad = 1;
    cart.push(findProduct);
  } else {
    findProduct.cantidad++;
  }

  applyPromotionsCart();
  calculateTotal();
  printCart();

  console.log(cart);
  console.log(total);
} */

// Exercise 8
function removeFromCart(id) {
  let remove = cart.findIndex((e) => e.id === id);
  if (cart[remove].quantity > 1) {
    cart[remove].quantity--;
  } else {
    cart.splice(remove, 1);
  }
  let remove2 = cartList.find((e) => e.id === id);
  if (remove2) {
    cartList.splice(remove2);
  }
  applyPromotionsCart();
  calculateTotal();
  printCart();
  console.log(cart);
}

function open_modal() {
  console.log("Open Modal");
  printCart();
}
