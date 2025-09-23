const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserById,
  getMe,
  updateUser,
  listUsers,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

// Static routes first
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/me", getMe);
router.get("/", listUsers);

// Dynamic route must go LAST
router.put("/:id", updateUser);
router.get("/:id", getUserById);


module.exports = router;
