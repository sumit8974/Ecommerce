const router = require("express").Router();
const { protect, protectAdmin } = require("../middleware/authMiddleware");
const {
  createOrder,
  getAllUserOrders,
  adminAllUsersOrders,
} = require("../controllers/orderControllers");

router.route("/").post(createOrder);
router.route("/").get(protect, getAllUserOrders);
router.route("/admin").get(protectAdmin, adminAllUsersOrders);

module.exports = router;
