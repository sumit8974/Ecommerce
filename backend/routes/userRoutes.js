const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  authUser,
  verifyIsAdmin,
} = require("../controllers/userControlles");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/verify-is-admin", protect, verifyIsAdmin);

module.exports = router;
