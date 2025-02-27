
//Category Icons
let categoryIcons = document.querySelectorAll(".category-img");
//items bar handling and loading items to the grid
categoryIcons.forEach((icon) => {
  icon.addEventListener("click", function () {

    document.getElementById("items-grid").innerHTML = '';

    if (icon.id === "category-1") {//burgers
      getProductsByCategory("Burgers");

    } else if (icon.id === "category-2") { //pastas
      getProductsByCategory("Pastas");

    } else if (icon.id === "category-3") { //chicken
      getProductsByCategory("Chicken");

    } else if (icon.id === "category-4") { //fries
      getProductsByCategory("Fries");

    } else if (icon.id === "category-5") { //submarines
      getProductsByCategory("Submarines");

    } else if (icon.id === "category-6") { //beverages
      getProductsByCategory("Beverages");

    }
  });
});



//get Product by Category
function getProductsByCategory(category) {
  return fetch(`http://localhost:8080/product/get-by-category/${category}`)
    .then(response => response.json())
    .then((items) => {
      items.forEach((item, index) => {
        console.log(item);
        document.getElementById("items-grid").innerHTML +=
          `<div class="col mb-3" data-index="${index}">
             <div class="card h-100">
                 <img src="/Images and lcons/turkey-burger.png" class="card-img-top" alt="Item 1">
                 <div class="card-body text-center pt-0">
                     <hr class="my-1">
                     <h5 class="card-title">${item.name}</h5>
                     <p class="card-text">Rs ${item.price}.00</p>
                     <div class="d-flex justify-content-center gap-2 mt-3">
                         <a href="#" class="view-item"><i class="bi bi-eye-fill p-2"></i></a>
                         <a href="#" class="delete-item"><i class="bi bi-trash p-2 text-danger"></i></a>
                         <a href="#" class="edit-item"><i class="bi bi-pencil-square p-2"></i></a>
                     </div>
                 </div>
             </div>
         </div>`;

      });


      // Add event listener for clicking on cards
      document.getElementById("items-grid").addEventListener("click", function (event) {
        const card = event.target.closest('.col');
        if (card) {
          const itemIndex = card.getAttribute('data-index');
          const item = items[itemIndex];
          console.log(item);
          console.log("Clicked item data:");

          // View Customer
          if (event.target && event.target.matches("a.view-item i")) {
            console.log("Clicked by view item");
            showProductdetails(item);

          }

          // Delete Customer
          if (event.target && event.target.matches("a.delete-item i")) {
            console.log("Clicked by delete item");
            deleteProduct(item.productId);

          }

          // Edit Customer
          if (event.target && event.target.matches("a.edit-item i")) {
            console.log("Clicked by edit item");
            showUpdateProductDetails(item);

          }
        }
      });

    })
}



//Show Product Details
function showProductdetails(product) {
  console.log(product);

  //document.getElementById("viewItemImage").src = itemObject.image || "/Images and lcons/default.png";
  document.getElementById("viewItemCode").textContent = product.productId;
  document.getElementById("viewItemName").textContent = product.name;
  document.getElementById("viewItemPrice").textContent = product.price.toFixed(2);
  document.getElementById("viewItemDiscount").textContent = product.discount.toFixed(2);
  //document.getElementById("viewItemExpire").textContent = itemObject.expireDate || "N/A";
  document.getElementById("viewItemQuantity").textContent = product.quantityAvailable || "N/A";
  document.getElementById("viewItemCategory").textContent = product.category || "N/A";
  document.getElementById("viewItemDescription").textContent = product.description || "N/A";

  // Show the view product modal
  const viewProductModal = new bootstrap.Modal(document.getElementById("ViewProductModal"));
  viewProductModal.show();
}



//Delete Product
function deleteProduct(productId) {

  const raw = "";

  const requestOptions = {
    method: "DELETE",
    body: raw,
    redirect: "follow"
  };

  fetch(`http://localhost:8080/product/delete/${productId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  //reload the page
  location.reload();

}

//Update Product
function showUpdateProductDetails(product) {
  console.log(product);


  document.getElementById("UpdateItemCode").value = product.productId;
  document.getElementById("UpdateitemName").value = product.name;
  document.getElementById("UpdateitemPrice").value = parseFloat(product.price).toFixed(2);
  document.getElementById("UpdateitemDiscountPrice").value = parseFloat(product.discount).toFixed(2);
  //document.getElementById("editItemExpire").value = itemObject.expireDate || "";
  //document.getElementById("editItemQuantity").value = itemObject.quantity || "";
  //document.getElementById("editItemCategory").value = itemObject.category || "";
  //document.getElementById("editItemDescription").value = itemObject.description || "";
  //document.getElementById("editItemAdditional").value = itemObject.additionalInfo || "";
  //document.getElementById("editItemImage").src = itemObject.image || "/Images and lcons/default.png";


  // Update product button
  document.getElementById("updateProductBtn").addEventListener("click", function (event) {
    event.preventDefault();
    UpdateProductinfo(product);
  })

  //cancel button
  document.getElementById("cancelUpdateBtn").addEventListener("click", () => {
    UpdateProductModal.hide();
    document.getElementById("productFormUpdate").reset();
  })

  // Show the update product modal
  const UpdateProductModal = new bootstrap.Modal(document.getElementById("updateProductModal"));
  UpdateProductModal.show();

}

function UpdateProductinfo(product) {
  console.log(product);

  // Get the form data
  //const productId = document.getElementById("UpdateItemCode").value;
  const name = document.getElementById("UpdateitemName").value;
  const price = parseFloat(document.getElementById("UpdateitemPrice").value);
  const discount = parseFloat(document.getElementById("UpdateitemDiscountPrice").value);
  //image = document.getElementById("editItemImage").src;


  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "productId": product.productId,
    "name": name,
    "price": price,
    "discount": discount,
    "image": product.image,
    "description": product.description,
    "category": product.category,
    "quantityAvailable": product.quantityAvailable
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8080/product/update", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  //reload the page
  location.reload();
}




// Trigger the "Burgers" category items on page load
document.addEventListener("DOMContentLoaded", function () {
  const burgersIcon = document.getElementById("category-1");
  if (burgersIcon) {
    burgersIcon.click();
  }
});





// Add New Product

document.getElementById("addNewProductBtn").addEventListener("click", () => {

  //form submit function when click the add product button
  document.getElementById("addProductBtn").addEventListener("click", function (event) {
    event.preventDefault();
    addNewProduct();
    addProductModal.hide();
    document.getElementById("productFormAdd").reset();
  });

  //cancel button function
  document.getElementById("cancelBtn").addEventListener("click", () => {
    addProductModal.hide();
    document.getElementById("productForm").reset();
  })

  // Add New Product Modal
  const addProductModal = new bootstrap.Modal(document.getElementById("addProductModal"));
  addProductModal.show();
});



// Add New Product function
function addNewProduct() {
  //const productCodeInput = document.getElementById("itemCode");
  const productNameInput = document.getElementById("itemName").value;
  const productPriceInput = document.getElementById("itemPrice").value;
  const categorySelect = document.getElementById("itemCategory").value;
  const discountInput = document.getElementById("itemDiscountPrice").value;
  //const productImgInput = document.getElementById("itemImage").value;

  if (!productNameInput || !productPriceInput || !categorySelect || !discountInput) {
    console.error("One or more form elements are missing!");
    alert("One or more form elements are missing!");
    return;
  } else {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": productNameInput,
      "price": productPriceInput,
      "discount": discountInput,
      "image": "cheesy_fries.jpg", //will be implement
      "description": "Golden crispy fries loaded with gooey melted cheese.", //need to implement
      "category": categorySelect, 
      "quantityAvailable": 42 //need to implement
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8080/product/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));


  }
}


//search function

const searchInput = document.getElementById("SearchItems");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  searchProducts(searchTerm);
});

function searchProducts(searchTerm) {
  const productCards = document.querySelectorAll(".card");
  productCards.forEach((card) => {
    const productName = card.querySelector(".card-title").textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}


/*
// card click events (view, delete, edit) .......

document.getElementById("items-grid").addEventListener("click", function (event) {



  // View item
  if (event.target && event.target.matches("a.view-item i")) {
    const card = event.target.closest('.card');
    const itemIndex = event.target.getAttribute('data-index');
    const itemCategory = event.target.getAttribute('data-category');
    const itemobject = SearchProductUsingIndex(itemIndex, itemCategory);
    console.log("Item Index:", itemIndex);
    console.log("Item Category:", itemCategory);
    console.log("Card Index:", itemobject);

    if (itemobject) {

      //document.getElementById("viewItemImage").src = itemObject.image || "/Images and lcons/default.png";
      document.getElementById("viewItemCode").textContent = itemobject.itemCode;
      document.getElementById("viewItemName").textContent = itemobject.name;
      document.getElementById("viewItemPrice").textContent = `${itemobject.price.toFixed(2)}`;
      document.getElementById("viewItemDiscount").textContent = ` ${itemobject.discount.toFixed(2)}`;
      //document.getElementById("viewItemExpire").textContent = itemObject.expireDate || "N/A";
      //document.getElementById("viewItemQuantity").textContent = itemObject.quantity || "N/A";
      //document.getElementById("viewItemCategory").textContent = itemObject.category || "N/A";
      //document.getElementById("viewItemDescription").textContent = itemObject.description || "N/A";
      //document.getElementById("viewItemAdditional").textContent = itemObject.additionalInfo || "N/A";

      // Show the view product modal
      const viewProductModal = new bootstrap.Modal(document.getElementById("ViewProductModal"));
      viewProductModal.show();

    } else {
      console.error("Item not found!");
    }


  }





  // Delete item
  if (event.target && event.target.matches("a.delete-item i")) {
    const card = event.target.closest('.card');
    const itemIndex = event.target.getAttribute('data-index');
    const itemCategory = event.target.getAttribute('data-category');
    const itemobject = SearchProductUsingIndex(itemIndex, itemCategory);
    console.log("Item Index:", itemIndex);
    console.log("Item Category:", itemCategory);
    console.log("Card Index:", itemobject);

    if (itemobject) {
      deleteProduct(itemIndex, itemCategory);
      card.remove();
    } else {
      console.error("Item not found!");
    }
  }






  // Update item
  if (event.target && event.target.matches("a.edit-item i")) {
    const card = event.target.closest('.card');
    const itemIndex = event.target.getAttribute('data-index');
    const itemCategory = event.target.getAttribute('data-category');
    const itemobject = SearchProductUsingIndex(itemIndex, itemCategory);
    console.log("Item Index:", itemIndex);
    console.log("Item Category:", itemCategory);
    console.log("Card Index:", itemobject);

    if (itemobject) {
      console.log(itemobject.itemCode);
      console.log(itemobject.name);
      console.log(itemobject.price);
      console.log(itemobject.discount);


      document.getElementById("UpdateItemCode").value = itemobject.itemCode.trim();
      document.getElementById("UpdateitemName").value = itemobject.name.trim();
      document.getElementById("UpdateitemPrice").value = parseFloat(itemobject.price).toFixed(2);
      document.getElementById("UpdateitemDiscountPrice").value = parseFloat(itemobject.discount).toFixed(2);
      //document.getElementById("editItemExpire").value = itemObject.expireDate || "";
      //document.getElementById("editItemQuantity").value = itemObject.quantity || "";
      //document.getElementById("editItemCategory").value = itemObject.category || "";
      //document.getElementById("editItemDescription").value = itemObject.description || "";
      //document.getElementById("editItemAdditional").value = itemObject.additionalInfo || "";


      // Update product button
      document.getElementById("updateProductBtn").addEventListener("click", function (event) {
        event.preventDefault();
        UpdateProductinfo();
      })

      //cancel button
      document.getElementById("cancelUpdateBtn").addEventListener("click", () => {
        UpdateProductModal.hide();
        document.getElementById("productFormUpdate").reset();
      })

      // Show the update product modal
      const UpdateProductModal = new bootstrap.Modal(document.getElementById("updateProductModal"));
      UpdateProductModal.show();

      // Update product function
      function UpdateProductinfo() {
        const itemCode = document.getElementById("UpdateItemCode").value.trim();
        const itemname = document.getElementById("UpdateitemName").value.trim();
        const itemprice = parseFloat(document.getElementById("UpdateitemPrice").value);
        const itemdiscount = parseFloat(document.getElementById("UpdateitemDiscountPrice").value);
        //const itemexpire = document.getElementById("editItemExpire").value;
        //const itemquantity = document.getElementById("editItemQuantity").value;
        //const itemcategory = document.getElementById("editItemCategory").value;
        //const itemdescription = document.getElementById("editItemDescription").value;
        //const itemadditional = document.getElementById("editItemAdditional").value;

        if (itemCode !== itemobject.itemCode || itemname !== itemobject.name || itemprice !== itemobject.price || itemdiscount !== itemobject.discount) {

          const itemobjectforupdate = {
            itemCode: itemCode,
            name: itemname,
            price: itemprice,
            discount: itemdiscount
          }
          updateProduct(itemIndex, itemCategory, itemobjectforupdate);
          UpdateProductModal.hide();
          document.getElementById("productFormUpdate").reset();
        } else {
          console.log("No changes made..!");
        }
      }



    } else {
      console.error("Item not found..!");
    }
  }




});


*/


