const express=require("express")
const {getWarehouses,addWarehouse}=require("../controllers/warehouseController")
const router = express.Router()
router.get("/",getWarehouses)
router.post("/",addWarehouse)

module.exports = router