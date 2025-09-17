const StockAdj=require("../models/StockAdj")

exports.getStockAdjustment=async (req,res) => {
   try{
    const stocks = await StockAdj.find().populate('warehouse_id').populate('product_id')
    res.json(stocks)
  }
  catch(err){
    res.status(400).json({error:err.message})
  }
}

exports.addStockAdjustment=async (req,res) => {
     try{
   const stock = new StockAdj(req.body)
  await stock.save()
  res.json(stock)
  }
  catch(err){
    res.status(400).json({error:err.message})
  }
}