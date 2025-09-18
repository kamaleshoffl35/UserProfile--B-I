const express=require("express")
const {getCustomerPayments,addCustomerPayment, deletePayment}=require("../controllers/customerpaymentController")
const router=express.Router()
router.get("/",getCustomerPayments)
router.post("/",addCustomerPayment)
router.delete("/:id",deletePayment)
module.exports=router