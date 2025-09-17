const Warehouse=require("../models/Warehouse")

exports.getWarehouses=async (req,res) => {
    try{
        const warehouses = await Warehouse.find()
  res.json(warehouses)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.addWarehouse=async (req,res) => {
    try{
       const warehouse = new Warehouse(req.body)
  await warehouse.save()
  res.json(warehouse)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}