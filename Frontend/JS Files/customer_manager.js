import { getCustomers, SearchCustomerUsingIndex, updateCustomer, addCustomer } from "./data.js";


//catch customer manager cards grid
console.log("Customer Manager Page Loaded..!");

//fetch all customers and display

fetch("http://localhost:8080/customer/get-all")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    // Display as cards
    result.forEach((customer, index) => {
      document.getElementById("customers-grid").innerHTML +=
        `<div class="col mb-3" data-index="${index}">
          <div class="card h-100">
            <img src="/Images and lcons/man.png" class="card-img-top" alt="Item 1">
            <div class="card-body text-center pt-0">
              <hr class="my-1">
              <h5 class="card-title">${customer.firstName} ${customer.lastName}</h5>
              <p class="card-text">${customer.phone}</p>
              <div class="d-flex justify-content-center gap-2 mt-3">
                <a href="#" class="view-customer"><i class="bi bi-eye-fill p-3"></i></a>
                <a href="#" class="delete-customer"><i class="bi bi-trash p-3 text-danger"></i></a>
                <a href="#" class="edit-customer"><i class="bi bi-pencil-square p-3"></i></a>
              </div>
            </div>
          </div>
        </div>`;
    });

    // Add event listener for clicking on cards
    document.getElementById("customers-grid").addEventListener("click", function (event) {
      const card = event.target.closest('.col');
      if (card) {
        const customerIndex = card.getAttribute('data-index');
        const customer = result[customerIndex];
        console.log("Clicked customer data:", customer);

        // View Customer
        if (event.target && event.target.matches("a.view-customer i")) {
          console.log("Clicked by view customer");
          showCustomerdetails(customer);

        }

        // Delete Customer
        if (event.target && event.target.matches("a.delete-customer i")) {
          console.log("Clicked by delete customer");
          deleteCustomer(customer.id);

        }

        // Edit Customer
        if (event.target && event.target.matches("a.edit-customer i")) {
          console.log("Clicked by edit customer");
          showUpdateCustomerDetails(customer);

        }
      }
    });
  });

function genderPicture(gender) {
  if (gender == "Male") {
    return "/Images and lcons/man.png";
  } else {
    return "/Images and lcons/woman.png";
  }
}

function showCustomerdetails(customer) {
  // Show the customer details
  document.getElementById("viewCustomerId").textContent = customer.id;
  document.getElementById("viewCustomerName").textContent = customer.firstName + " " + customer.lastName;
  document.getElementById("viewCustomerGender").textContent = customer.gender;
  document.getElementById("viewCustomerOccupation").textContent = customer.occupation;
  document.getElementById("viewCustomerLocation").textContent = customer.location;
  document.getElementById("viewCustomerPhno").textContent = customer.phone;
  document.getElementById("viewCustomerEmail").textContent = customer.email;
  document.getElementById("viewCustomerAdi").textContent = customer.additionalInfo;
  document.getElementById("viewCustomerImage").src = genderPicture(customer);

  // Show the view product modal
  const viewCustomerModal = new bootstrap.Modal(document.getElementById("ViewCustomerModal"));
  viewCustomerModal.show();

}

function showUpdateCustomerDetails(customer) {
  // Update the customer details
  document.getElementById("UpdateCustomerId").value = customer.id || "";
  document.getElementById("UpdateCustomerFirstName").value = customer.firstName || "";
  document.getElementById("UpdateCustomerLastName").value = customer.lastName || "";
  document.getElementById("UpdateCustomerGender").value = customer.gender || "";
  document.getElementById("UpdateCustomerOccupation").value = customer.occupation || "";
  document.getElementById("UpdateCustomerLocation").value = customer.location || "";
  document.getElementById("UpdateCustomerPhno").value = customer.phone || "";
  document.getElementById("UpdateCustomerEmail").value = customer.email || "";
  document.getElementById("UpdateCustomerAdi").value = customer.additionalInfo || "";
  document.getElementById("UpdateCustomerImage").src = genderPicture(customer.gender);

  // Update customer button
  document.getElementById("updateCustomerBtn").addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Update Customer Button Clicked");
    UpdateCustomer(customer);
    UpdateCustomerModal.hide();
  })

  //cancel button
  document.getElementById("cancelUpdateBtn").addEventListener("click", () => {
    UpdateCustomerModal.hide();
    document.getElementById("customerFormUpdate").reset();
  })

  // Show the view product modal
  const UpdateCustomerModal = new bootstrap.Modal(document.getElementById("updateCustomerModal"));
  UpdateCustomerModal.show();
}



function deleteCustomer(id) {
  const raw = "";

  const requestOptions = {
    method: "DELETE",
    body: raw,
    redirect: "follow"
  };

  fetch(`http://localhost:8080/customer/delete/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  //reload the page
  location.reload();
}

function UpdateCustomer(customer) {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id": customer.id,
    "firstName": document.getElementById("UpdateCustomerFirstName").value,
    "lastName": document.getElementById("UpdateCustomerLastName").value,
    "gender": document.getElementById("UpdateCustomerGender").value,
    "occupation": document.getElementById("UpdateCustomerOccupation").value,
    "location": document.getElementById("UpdateCustomerLocation").value,
    "email": document.getElementById("UpdateCustomerEmail").value,
    "phone": document.getElementById("UpdateCustomerPhno").value,
    "additionalInfo": document.getElementById("UpdateCustomerAdi").value
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8080/customer/update", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  //reload the page
  location.reload();

}

// Open add customer form
document.getElementById("addNewCustomerBtn").addEventListener("click", () => {

  //form submit function
  document.getElementById("AddCustomerBtn").addEventListener("click", function (event) {
    event.preventDefault();
    addNewCustomer();
    addCustomerModal.hide();
    document.getElementById("AddCustomerForm").reset();
  });

  //cancel button function
  document.getElementById("cancelAddBtn").addEventListener("click", () => {
    addCustomerModal.hide();
    document.getElementById("AddCustomerForm").reset();
  });


  const addCustomerModal = new bootstrap.Modal(document.getElementById("AddCustomerModal"));
  addCustomerModal.show();

});


//function of add customer
function addNewCustomer() {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "firstName": document.getElementById("AddCustomerFirstName").value,
    "lastName": document.getElementById("AddCustomerLastName").value,
    "gender": document.getElementById("AddCustomerGender").value,
    "occupation": document.getElementById("AddCustomerOccupation").value,
    "location": document.getElementById("AddCustomerLocation").value,
    "email": document.getElementById("AddCustomerEmail").value,
    "phone": document.getElementById("AddCustomerPhno").value,
    "additionalInfo": document.getElementById("AddCustomerAdi").value
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8080/customer/add", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  //reload the page
  location.reload();
}



















//search function
const searchInput = document.getElementById("SearchCustomers");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  searchCustomers(searchTerm);
});

function searchCustomers(searchTerm) {
  const customers = getCustomers();
  const filteredCustomers = customers.filter((customer) => customer.firstName.toLowerCase().includes(searchTerm) || customer.lastName.toLowerCase().includes(searchTerm));
  displayCustomers(filteredCustomers);
}



