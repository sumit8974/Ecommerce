const router = require("express").Router();
const {
  getProducts,
  singleProduct,
} = require("../controllers/productControllers");

router.route("/").get(getProducts);
router.route("/").post(singleProduct);

module.exports = router;
