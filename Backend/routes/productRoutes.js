const express = require("express");
const { getProducts, addProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
