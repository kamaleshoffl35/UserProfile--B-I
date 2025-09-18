const express = require("express");
const {getCustomers,addCustomer,deleteCustomer} = require("../controllers/customerController");
const router = express.Router();

router.get("/", getCustomers);
router.post("/", addCustomer);
router.delete("/:id",deleteCustomer);


module.exports = router;