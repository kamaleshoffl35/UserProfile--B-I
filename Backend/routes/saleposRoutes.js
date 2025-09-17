const express=require('express')
const {getSalePOSs,addSalePOS} = require("../controllers/saleposController")
const router = express.Router()
router.get("/",getSalePOSs)
router.post("/",addSalePOS)
module.exports=router