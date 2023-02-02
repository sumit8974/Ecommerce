const asyncHandler = require("express-async-handler");
const Product = require("../models/productModal");

//get all the products //

const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    res.status(400);
    throw new Error("Cannot fetch products at the moment");
  }
  res.status(200).json(products);
});

// get single item //

const singleProduct = asyncHandler(async (req, res, next) => {
  const { itemId } = req.body;
  if (!itemId) {
    res.status(400);
    throw new Error("Provide proper item id");
  }
  const item = await Product.findById(itemId);
  res.status(200).json(item);
});
module.exports = { getProducts, singleProduct };
