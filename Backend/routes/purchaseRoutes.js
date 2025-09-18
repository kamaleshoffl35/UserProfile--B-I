const express=require("express")
const {getPurchases,addPurchase, deletePurchase}=require("../controllers/purchaseController")
const router=express.Router()
router.get("/",getPurchases)
router.post("/",addPurchase)
router.delete("/:id",deletePurchase)
module.exports = router