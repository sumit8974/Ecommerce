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

const uploadProduct = asyncHandler(async (req, res) => {
  const newpath = "../frontend/src/assets/images/";
  console.log();
  const { prodName, prodPrice, prodCategory, prodDesc } = req.body;
  const file = req.files.file;
  const fileName = req.files.file.name;
  await file.mv(`${newpath}${fileName}`, (err) => {
    if (err) {
      res.status(500).send({ msg: "File upload error...", code: 200 });
    }
  });
  try {
    await Product.create({
      name: prodName,
      price: prodPrice,
      category: prodCategory,
      desc: prodDesc,
      src: fileName,
    });
  } catch (err) {
    res.status(500).send({ msg: "Product not Added...", code: 200 });
  }
  res.status(200).send({ msg: "Product Added...", code: 200 });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    await Product.deleteOne({ _id: id });
  } catch (err) {
    res.status(500).json({ msg: "Product not deleted..." });
  }
  res.status(200).json({ msg: "Product deleted..." });
});
module.exports = { getProducts, singleProduct, uploadProduct, deleteProduct };
