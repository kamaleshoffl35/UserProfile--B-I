const express = require("express");
const {getUnits, addUnit} = require("../controllers/unitController");
const router = express.Router();

router.get("/", getUnits);
router.post("/", addUnit);


module.exports = router;
