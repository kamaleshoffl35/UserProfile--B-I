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

exports.deleteSaleReport= async(req,res)=>{
  try{
    const deleted=await Salereport.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({message:"Reports not found" });
    }
    res.json({ message: "Reports deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};