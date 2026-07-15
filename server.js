"use strict";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/furnitureDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connection error:", err));


// Define schema

const orderSchema = new mongoose.Schema({
    item: String,
    quantity: Number,
    status: { type: String, default: "Confirmed" },
    deliveryTime: { type: String, default: "4-7 days" }
});

const Order = mongoose.model("Order", orderSchema);

// API endpoint

app.post("/order", async (req, res) => {
    const { item, quantity } = req.body;
    const newOrder = new Order({ item, quantity });
    await newOrder.save();

    res.json({ message: `Order confirmed! Delivery in 4-7 days.` });
});

app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));