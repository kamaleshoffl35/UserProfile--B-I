const express = require("express");
const {getTaxes, addTax} = require("../controllers/taxController");
const router = express.Router();

router.get("/", getTaxes);
router.post("/", addTax);


module.exports = router;
