const express=require("express")
const {getStockAdjustment,addStockAdjustment} = require('../controllers/stockAdjustment')
const router=express.Router()
router.get("/",getStockAdjustment)
router.post("/",addStockAdjustment)
module.exports=router