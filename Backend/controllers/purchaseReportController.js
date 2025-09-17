const Purchasereport=require("../models/Purchasereport")

exports.getPurchaseReports=async (req,res) => {
    try{
       const purchasereports=await Purchasereport.find().populate('supplier_id','name')
       res.json(purchasereports)
    }
    catch{
        res.status(500).json({error:err.message})
    }
}

exports.addPurchaseReport=async (req,res) => {
    try{
        const purchasereport=new Purchasereport(req.body)
        await purchasereport.save()
        await purchasereport.populate('supplier_id','name')
        res.json(purchasereport)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}