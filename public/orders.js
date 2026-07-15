"use strict";


async function loadOrders() {

    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();
    const table = document.getElementById("ordersTable");

    orders.forEach(order => {

        table.innerHTML += `
            <tr>
                <td>${order.item}</td>
                <td>${order.quantity}</td>
                <td>${order.status}</td>
                <td>${order.deliveryTime}</td>
            </tr>
        `;

    });

}

loadOrders();