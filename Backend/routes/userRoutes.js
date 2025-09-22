
const express = require("express");
const router = express.Router();
const {register,login,getUserById,getMe,updateUser,listUsers}=require("../controllers/userController");

router.post("/register",register);
router.post("/login",login);
router.get("/me",getMe); // uses x-user-id header or ?userId=
router.get("/",listUsers);
router.get("/:id",getUserById);
router.put("/:id",updateUser);

module.exports = router;
