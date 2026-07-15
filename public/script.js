"use strict";
document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const item = e.target.item.value;
    const quantity = e.target.quantity.value;

    const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, quantity })
    });

    const data = await response.json();
    document.getElementById("response").innerText = data.message;
});
