const express=require('express')
const {getSalePOSs,addSalePOS, deleteSale} = require("../controllers/saleposController")
const router = express.Router()
router.get("/",getSalePOSs)
router.post("/",addSalePOS)
router.delete("/:id",deleteSale)
module.exports=router