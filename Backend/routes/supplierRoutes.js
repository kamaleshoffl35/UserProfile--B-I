const express = require('express')
const {getSuppliers,addSupplier} = require("../controllers/supplierController")
const { route } = require('./unitRoutes')
const router =express.Router()

router.get("/",getSuppliers)
router.post("/",addSupplier)

module.exports = router