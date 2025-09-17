const Salereport = require("../models/Salereport")

exports.getSaleReports = async (req,res) => {
    try{
       const salereports = await Salereport.find().populate('customer_id','name')
       res.json(salereports)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.addSaleReport = async (req,res) => {
    try{
        const salereport = new Salereport(req.body)
        await salereport.save()
        await salereport.populate('customer_id','name')
        res.json(salereport)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}