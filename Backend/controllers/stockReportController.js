const Stockreport = require('../models/Stockreport')

exports.getStockReports = async (req,res) => {
    try{
      const stockreports = await Stockreport.find().populate('product_id','name').populate('warehouse_id','name  warehouse_name store_name').populate('category_id','name')
      res.json(stockreports)
    }
    catch{
        res.status(500).json({error:err.message})
    }
}

exports.addStockReport = async (req,res) => {
    try{
        const stockreport=new Stockreport(req.body)
        await stockreport.save()
        await stockreport.populate('product_id','name')
        await stockreport.populate('warehouse_id','name store_name warehouse_name')
        await stockreport.populate('category_id','name')
        res.json(stockreport)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}