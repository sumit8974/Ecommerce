const router = require("express").Router();
const { protectAdmin } = require("../middleware/authMiddleware");
const {
  getProducts,
  singleProduct,
  uploadProduct,
  deleteProduct,
} = require("../controllers/productControllers");

router.route("/").get(getProducts);
router.route("/").post(singleProduct);
router.route("/upload").post(protectAdmin, uploadProduct);
router.route("/delete").post(protectAdmin, deleteProduct);

module.exports = router;
