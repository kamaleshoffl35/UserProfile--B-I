const express = require('express')
const {getSuppliers,addSupplier, deleteSupplier} = require("../controllers/supplierController")
const { route } = require('./unitRoutes')
const router =express.Router()

router.get("/",getSuppliers)
router.post("/",addSupplier)
router.delete("/:id",deleteSupplier)

module.exports = router