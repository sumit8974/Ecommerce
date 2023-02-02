const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { registerUser, authUser } = require("../controllers/userControlles");

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
