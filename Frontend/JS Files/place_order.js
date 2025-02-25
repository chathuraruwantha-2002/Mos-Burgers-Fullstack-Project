import { getProducts, SearchProductUsingIndex } from "./data.js";
console.log("Place Order Page Loaded...");


//Category Icons
let categoryIcons = document.querySelectorAll(".category-img");

//Items
let items = getProducts();

//items bar handling and loading items to the grid
categoryIcons.forEach((icon) => {
  icon.addEventListener("click", function () {

    document.getElementById("items-grid").innerHTML = '';

    if (icon.id === "category-1") {
      console.log(items.Burgers);

      for (let i = 0; i < items.Burgers.length; i++) {
        document.getElementById("items-grid").innerHTML +=
          `<div class="col mb-3">
             <div class="card h-100" data-index="${i}" data-category="Burgers">
                 <img src="/Images and lcons/turkey-burger.png" class="card-img-top" alt="Item 1">
                 <div class="card-body text-center pt-0">
                     <hr class="my-1">
                     <h5 class="card-title">${items.Burgers[i].name}</h5>
                     <p class="card-text">Rs ${items.Burgers[i].price}.00</p>
                 </div>
             </div>
         </div>`;

      }
    } else if (icon.id === "category-2") {
      console.log(items.Pasta);

      for (let i = 0; i < items.Pasta.length; i++) {
        document.getElementById("items-grid").innerHTML +=
          `<div class="col mb-3">
             <div class="card h-100" data-index="${i}" data-category="Pasta">
                 <img src="/Images and lcons/pasta.png" class="card-img-top" alt="Item 1">
                 <div class="card-body text-center pt-0">
                     <hr class="my-1">
                     <h5 class="card-title">${items.Pasta[i].name}</h5>
                     <p class="card-text">Rs ${items.Pasta[i].price}.00</p>
                 </div>
             </div>
         </div>`;
      }
    } else if (icon.id === "category-3") {
      console.log(items.Chicken);

      for (let i = 0; i < items.Chicken.length; i++) {
        document.getElementById("items-grid").innerHTML +=
          `<div class="col mb-3">
             <div class="card h-100" data-index="${i}" data-category="Chicken">
                 <img src="/Images and lcons/chicken.png" class="card-img-top" alt="Item 1">
                 <div class="card-body text-center pt-0">
                     <hr class="my-1">
                     <h5 class="card-title">${items.Chicken[i].name}</h5>
                     <p class="card-text">Rs ${items.Chicken[i].price}.00</p>
                 </div>
             </div>
         </div>`;

      }
    } else if (icon.id === "category-4") {
      console.log(items.Fries);

      for (let i = 0; i < items.Fries.length; i++) {
        document.getElementById("items-grid").innerHTML +=
          `<div class="col mb-3">
             <div class="card h-100" data-index="${i}" data-category="Fries">
                 <img src="/Images and lcons/fries.png" class="card-img-top" alt="Item 1">
                 <div class="card-body text-center pt-0">
                     <hr class="my-1">
                     <h5 class="card-title">${items.Fries[i].name}</h5>
                     <p class="card-text">Rs ${items.Fries[i].price}.00</p>
                 </div>
             </div>
         </div>`;
      }
    } else if (icon.id === "category-5") {
      console.log(items.Submarines);

      for (let i = 0; i < items.Submarines.length; i++) {
        document.getElementById("items-grid").innerHTML +=
          `<div class="col mb-3">
             <div class="card h-100" data-index="${i}" data-category="Submarines">
                 <img src="/Images and lcons/Submarine bun.png" class="card-img-top" alt="Item 1">
                 <div class="card-body text-center pt-0">
                     <hr class="my-1">
                     <h5 class="card-title">${items.Submarines[i].name}</h5>
                     <p class="card-text">Rs ${items.Submarines[i].price}.00</p>
                 </div>
             </div>
         </div>`;
      }
    } else if (icon.id === "category-6") {
      console.log(items.Beverages);

      for (let i = 0; i < items.Beverages.length; i++) {
        document.getElementById("items-grid").innerHTML +=
          `<div class="col mb-3">
             <div class="card h-100" data-index="${i}" data-category="Beverages">
                 <img src="/Images and lcons/bevarages.png">
                 <div class="card-body text-center pt-0">
                     <hr class="my-1">
                     <h5 class="card-title">${items.Beverages[i].name}</h5>
                     <p class="card-text">Rs ${items.Beverages[i].price}.00</p>
                 </div>
             </div>
         </div>`;
      }
    }
  });
});

// Trigger the "Burgers" category items on page load
document.addEventListener("DOMContentLoaded", function () {
  const burgersIcon = document.getElementById("category-1");
  if (burgersIcon) {
    burgersIcon.click();
  }
});


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

