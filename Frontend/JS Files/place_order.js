
//live date set
document.getElementById("date").innerHTML = new Date().toLocaleDateString();


let categoryIcons = document.querySelectorAll(".category-img");
categoryIcons.forEach(icon => {
  icon.addEventListener("click", function () {
    document.getElementById("items-grid").innerHTML = '';
    getProductsByCategory(icon.id);
  });
});


function getProductsByCategory(categoryId) {
  let categoryName = '';

  switch (categoryId) {
    case 'category-1':
      categoryName = 'Burgers';
      break;
    case 'category-2':
      categoryName = 'Pastas';
      break;
    case 'category-3':
      categoryName = 'Chicken';
      break;
    case 'category-4':
      categoryName = 'Fries';
      break;
    case 'category-5':
      categoryName = 'Submarines';
      break;
    case 'category-6':
      categoryName = 'Beverages';
      break;
    default:
      categoryName = 'Others';
  }

  fetch(`http://localhost:8080/product/get-by-category/${categoryName}`)
    .then(response => response.json())
    .then(items => {
      generateItemsGrid(items);
    });
}


function generateItemsGrid(items) {
  const itemsGrid = document.getElementById("items-grid");
  itemsGrid.innerHTML = '';

  items.forEach(item => {
    const itemHTML = `
      <div class="col mb-3" data-item-id="${item.productId}">
        <div class="card h-100">
          <img src="/Images and lcons/turkey-burger.png" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <hr class="my-1">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Rs ${item.price}.00</p>
          </div>
        </div>
      </div>`;
    itemsGrid.innerHTML += itemHTML;
  });

  // Add event listener for card clicks
  const productCards = itemsGrid.querySelectorAll(".card");
  productCards.forEach(card => {
    card.addEventListener("click", function (event) {
      const itemId = card.closest('.col').getAttribute('data-item-id');
      const item = items.find(i => i.productId == itemId);
      addToCart(item);
    });
  });
}

// Cart Handling
let cart = [];

// Function to add items to cart
function addToCart(item) {
  console.log(cart);
  const existingItem = cart.find(cartItem => cartItem.productId === item.productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCartView();
}




// Function to update the cart view
function updateCartView() {
  const cartSection = document.getElementById("cart-section");
  let cartText = '';
  let SubTotal = 0;
  let discount = 0;
  let total = 0;
  let tax = 0;

  cart.forEach(item => {
    const { name, price, quantity } = item;

    // format the text for display
    const lineWidth = 50;
    const paddedName = name.padEnd(lineWidth - (price.toString().length + quantity.toString().length));
    const formattedText = `${paddedName}${quantity}            Rs ${price * quantity}`;

    cartText += `${formattedText}\n`;
    SubTotal += price * quantity;
  });

  cartSection.value = cartText;


  // update total after adding discount or tax
  document.addEventListener("input", function (event) {
    if (event.target.id === "add-discount" || event.target.id === "add-tax") {

      discount = document.getElementById("add-discount").value / 100 * SubTotal;
      tax = document.getElementById("add-tax").value / 100 * SubTotal;

      total = SubTotal - discount + tax;

      document.getElementById("viewOrderSubTotal").innerText = `Sub Total: Rs ${SubTotal}.00`;
      document.getElementById("viewOrderTax").innerText = `Tax: Rs ${tax}.00`;
      document.getElementById("viewOrderDiscount").innerText = `Discount: Rs ${discount}.00`;
      document.getElementById("viewOrderTotal").innerText = `Total: Rs ${total}.00`;

    }
  })
}

//place order button
document.getElementById("btn-place-order").addEventListener("click", function () {
  console.log("Place Order Button Clicked");
  placeOrder();
});


// clear form and cart
document.getElementById("btn-clear").addEventListener("click", function () {
  console.log("Clear Button Clicked");
  clearCart();
});
function clearCart() {
  cart = [];
  document.getElementById("cart-section").value = '';
  document.getElementById("viewOrderSubTotal").innerText = `Sub Total: Rs 0.00`;
  document.getElementById("viewOrderTax").innerText = `Tax: Rs 0.00`;
  document.getElementById("viewOrderDiscount").innerText = `Discount: Rs 0.00`;
  document.getElementById("viewOrderTotal").innerText = `Total: Rs 0.00`;
  document.getElementById("add-discount").value = '';
  document.getElementById("add-tax").value = '';
  document.getElementById("payment-method").value = '';
  document.getElementById("additional-details").value = '';
}



// Trigger the "Burgers" category items on page load
document.addEventListener("DOMContentLoaded", function () {
  const burgersIcon = document.getElementById("category-1");
  if (burgersIcon) {
    burgersIcon.click();
  }
});

function placeOrder() {
  //add order to database
  addOrder();
  addOrderItems();
}


function addOrder() {

  //get order details
  let custId = 2;
  let empId = 1;
  let date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
  let isReturned = "No";
  let paymentMethod = document.getElementById("payment-method").value;
  let additionalDetails = document.getElementById("additional-details").value;
  let discount = document.getElementById("viewOrderDiscount").innerText.split("Rs ")[1];
  let tax = document.getElementById("viewOrderTax").innerText.split("Rs ")[1];
  let subTotal = document.getElementById("viewOrderSubTotal").innerText.split("Rs ")[1];


  //display order details all
  console.log(custId, empId, date, isReturned, paymentMethod, additionalDetails, discount, tax, subTotal);



  //add order to database using fetch
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "subTotal": subTotal,
    "discount": discount,
    "tax": tax,
    "isReturned": isReturned,
    "paymentType": paymentMethod,
    "date": date,
    "empId": empId,
    "custId": custId
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8080/order/add", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}


function addOrderItems() {

  //get orderd items one by one
  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];
    console.log(cartItem);

    console.log(cartItem.productId, cartItem.price, cartItem.quantity);
    //add order item to database using fetch

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "orderId": 46,//makeit after
      "productId": cartItem.productId,
      "totalPrice": cartItem.price,
      "qty": cartItem.quantity
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8080/order-item-details/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));


    console.log(`Order Item ${cartItem.name} Added successfully...!`);
  }
  console.log("Order Items Added successfully...!");

}





//search bar
const searchInput = document.getElementById("SearchItems");
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const items = document.querySelectorAll(".card");
  items.forEach((item) => {
    const title = item.querySelector("h5").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});











/*




// Add items to the place order cart
document.getElementById("items-grid").addEventListener("click", function (event) {
  const card = event.target.closest('.card');

  if (!card) {
    console.warn("No card element found.");
    return;
  }

  const itemIndex = card.dataset.index;
  const itemCategory = card.dataset.category;

  if (!itemIndex || !itemCategory) {
    console.warn("Required data attributes are missing.");
    return;
  }

  const itemObject = SearchProductUsingIndex(itemIndex, itemCategory);

  console.log("Item Index:", itemIndex);
  console.log("Item Category:", itemCategory);
  console.log("Item Object:", itemObject);

  // Initialize the cartItems object if not already defined
  if (!window.cartItems) {
    window.cartItems = {};
  }

  //qty update
  if (window.cartItems[itemObject.name]) {
    window.cartItems[itemObject.name].quantity++;
    window.cartItems[itemObject.name].price = (window.cartItems[itemObject.name].quantity * itemObject.price).toFixed(2);
  } else {
    window.cartItems[itemObject.name] = {
      name: itemObject.name,
      price: itemObject.price.toFixed(2),
      quantity: 1
    };
  }

  updateCart();

});

// update cart section text area
function updateCart() {
  const cartSection = document.getElementById("cart-section");
  cartSection.value = '';

  for (let item in window.cartItems) {
    const { name, price, quantity } = window.cartItems[item];


    // format the text for display
    const lineWidth = 50;
    const paddedName = name.padEnd(lineWidth - (price.length + quantity.toString().length));
    const formattedText = `${paddedName}${quantity}            ${price}`;

    cartSection.value += `${formattedText}\n`;
  }

}

//order calculations

function SubTotal() {
  let totalAmount = 0;
  for (let item in window.cartItems) {
    const price = parseFloat(window.cartItems[item].price);
    totalAmount += price;
  }
  return totalAmount;
}

function discount() {
  const discountInput = document.getElementById("add-discount");
  const discount = parseFloat(discountInput.value);

  if (isNaN(discount) || discount < 0) {
    return 0;
  }

  return (SubTotal() * discount) / 100;
}

function displayOrderCalculationsandCatchData() {
  const totalAmount = SubTotal();
  const discountAmount = discount();
  const grandTotal = totalAmount - discountAmount;
  document.getElementById("viewOrderSubTotal").textContent = `Sub Total : Rs ${totalAmount.toFixed(2)}`;
  document.getElementById("viewOrderDiscount").textContent = `Discount : Rs ${discountAmount.toFixed(2)}`;
  document.getElementById("viewOrderTotal").textContent = `Total : Rs ${grandTotal.toFixed(2)}`;

  //create order object (items details, totalItems, subTotal, discount, totalAmount)
  window.order = {
    items: window.cartItems,
    totalItems: Object.keys(window.cartItems).length,
    subTotal: totalAmount,
    discount: discountAmount,
    totalAmount: grandTotal
  }
  console.log(window.order);
}

// Discount trigger - runs once when leaving the discount input field
const discountInput = document.getElementById("add-discount");
discountInput.addEventListener("blur", function () {
  displayOrderCalculationsandCatchData();
  console.log("Discount Triggered");
});

// place order
document.getElementById("btn-place-order").addEventListener("click", function () {
  displayOrderCalculationsandCatchData();
  console.log("Place Order Triggered");
});






*/