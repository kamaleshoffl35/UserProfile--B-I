const express =require("express")
const {getSupplierPayments,addSupplierPayment}=require("../controllers/supplierpaymentController")
const router=express.Router()
router.get("/",getSupplierPayments)
router.post("/",addSupplierPayment)
module.exports = router