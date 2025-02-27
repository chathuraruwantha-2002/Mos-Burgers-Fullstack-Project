import { getOrders, SearchOrderUsingIndex, deleteOrder, searchOrderByOrderId } from "./data.js";

//let orderList = getOrders();

//console.log(orderList);

console.log("Orders Manager Page Loaded..!");

//fetch all orders and display

document.addEventListener('DOMContentLoaded', () => {

    const tableBody = document.querySelector('tbody');

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8080/order/get-all", requestOptions)
        .then((response) => response.json())
        .then((orderList) => {
            console.log(orderList);

            orderList.forEach(order => {

                const row = document.createElement('tr');

                row.innerHTML = `
                <td>${order.orderId}</td>
                <td>
                    <img src="/Images and lcons/man.png" class="rounded-circle me-2 p-1" alt="Avatar">
                    ${order.empId}
                </td>
                <td>${order.empId}</td>
                <td>${order.date}</td>
                <td class="status-completed">${order.isReturned}</td>
                <td>${(order.subTotal - order.discount + order.tax).toFixed(2)}</td>
                <td class="action-icons">
                    <a href="#" class="text-primary"><i class="bi bi-eye-fill"></i></a>
                    <a href="#" class="text-danger"><i class="bi bi-trash-fill"></i></a>
                </td>
            `;

                tableBody.appendChild(row);

            })

            document.addEventListener("click", (event) => {
                const target = event.target;

                // Delete Order
                if (target.classList.contains("bi-trash-fill")) {
                    const row = target.closest("tr");
                    const orderId = row.querySelector("td:nth-child(1)").textContent;
                    const confirmDelete = confirm(`Are you sure you want to delete order ${orderId} ?`);
                    if (confirmDelete) {
                        row.remove();
                        DeleteOrder(orderId);
                    }
                }

                // View Order
                if (target.classList.contains("bi-eye-fill")) {
                    const row = target.closest("tr");
                    const orderId = row.querySelector("td:nth-child(1)").textContent;
                    const order = orderList.find((o) => o.orderId == orderId);
                    if (order) {
                        ViewOrderDetails(order);
                    } else {
                        console.error("Order not found!");
                    }
                }
            });
        
        });



});

//search order
document.getElementById('search-order').addEventListener('input', () => {
    const searchQuery = document.getElementById('search-order').value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        const orderId = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const customerName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const phoneNumber = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        if (customerName.includes(searchQuery) || orderId.includes(searchQuery) || phoneNumber.includes(searchQuery)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
});


// View Order
function ViewOrderDetails(order) {
    console.log(order);

    document.getElementById('viewOrderId').textContent = order.orderId;
   // document.getElementById('viewCustomerName').textContent = order.customerName;
    //document.getElementById('viewCustomerPhno').textContent = order.phoneNumber;
    //document.getElementById('viewCustomerAddress').textContent = order.address;
    //document.getElementById('viewOrderItems').textContent = order.items;
    //document.getElementById('viewOrderAdi').textContent = order.additionalInfo;
    document.getElementById('viewOrderdate').textContent = order.date;
    //document.getElementById('viewOrderItems').textContent = order.totalItems;
    document.getElementById('viewOrderSubTotal').textContent = order.subTotal.toFixed(2);
    document.getElementById('viewOrderDiscount').textContent = order.discount.toFixed(2);
    document.getElementById('viewOrderTax').textContent = order.tax.toFixed(2);
    document.getElementById('viewOrderTotal').textContent = (order.subTotal - order.discount + order.tax).toFixed(2);

    const UpdateOrderModal = new bootstrap.Modal(document.getElementById("ViewOrderModal"));
    UpdateOrderModal.show();

}

// Delete Order
function DeleteOrder(orderId) {
    console.log(orderId);
    const raw = "";

    const requestOptions = {
      method: "DELETE",
      body: raw,
      redirect: "follow"
    };
    
    fetch(`http://localhost:8080/order/delete/${orderId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

  //reload the page
  location.reload();
}


