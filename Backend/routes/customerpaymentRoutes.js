const express=require("express")
const {getCustomerPayments,addCustomerPayment}=require("../controllers/customerpaymentController")
const router=express.Router()
router.get("/",getCustomerPayments)
router.post("/",addCustomerPayment)
module.exports=router