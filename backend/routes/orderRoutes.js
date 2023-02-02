const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  createOrder,
  getAllUserOrders,
} = require("../controllers/orderControllers");

router.route("/").post(createOrder);
router.route("/").get(protect, getAllUserOrders);

module.exports = router;
