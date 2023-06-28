const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDb();
const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Ecommerce");
});

app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
