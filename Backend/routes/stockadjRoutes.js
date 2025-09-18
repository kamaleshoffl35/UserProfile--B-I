const express=require("express")
const {getStockAdjustment,addStockAdjustment, deleteStockAdjustment} = require('../controllers/stockAdjustment')
const router=express.Router()
router.get("/",getStockAdjustment)
router.post("/",addStockAdjustment)
router.delete("/:id",deleteStockAdjustment)
module.exports=router