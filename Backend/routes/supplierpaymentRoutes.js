const express =require("express")
const {getSupplierPayments,addSupplierPayment, deletePayment}=require("../controllers/supplierpaymentController")

const router=express.Router()
router.get("/",getSupplierPayments)
router.post("/",addSupplierPayment)
router.delete("/:id",deletePayment)
module.exports = router
