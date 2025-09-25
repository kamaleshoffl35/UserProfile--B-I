const express = require("express");
const {getTaxes, addTax, deletetax} = require("../controllers/taxController");
const router = express.Router();

router.get("/", getTaxes);
router.post("/", addTax);
router.delete("/:id",deletetax)


module.exports = router;
