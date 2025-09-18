const express=require("express")
const {getWarehouses,addWarehouse, deleteWarehouse}=require("../controllers/warehouseController")
const router = express.Router()
router.get("/",getWarehouses)
router.post("/",addWarehouse)
router.delete("/:id",deleteWarehouse)

module.exports = router