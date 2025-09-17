const GSTreport = require("../models/GSTreport")

exports.getGSTReports = async (req,res) => {
    try{
        const gstreports = await GSTreport.find().populate('customer_id','name state_code').populate('supplier_id','name state_code')
        res.json(gstreports)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.addGSTReport = async (req,res) => {
    try{
         const gstreport = new GSTreport(req.body)
         await gstreport.save()
         await gstreport.populate('customer_id','name state_code')
         await gstreport.populate('supplier_id','name state_code')
         
         res.json(gstreport)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}