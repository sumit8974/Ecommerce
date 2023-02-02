const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDb();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Ecommerce");
});

app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
