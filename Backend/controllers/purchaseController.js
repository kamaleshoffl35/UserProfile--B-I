const Purchase = require("../models/Purchase")

exports.getPurchases=async (req,res) => {
    try{
         const purchases = await Purchase.find().populate('supplier_id warehouse_id items.product_id');
    res.json(purchases);
    }
    catch{
        res.status(500).json({error:err.message})
    }
}
 
exports.addPurchase=async (req,res) => {
    try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.json(purchase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.deletePurchase= async(req,res)=>{
  try{
    const deleted=await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({message:"Purchase not found" });
    }
    res.json({ message: "Purchase deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
