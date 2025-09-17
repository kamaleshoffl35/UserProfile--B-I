const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
 from_date:{type:Date,required:true},
 to_date:{type:Date,required:true},
 customer_id:{type: mongoose.Schema.Types.ObjectId,ref:"Customer"},
 invoice_type:{type:String,required:true},
 invoice_no: { type: String },        
 payment_mode: { type: String }  
},
{timestamps:true});

module.exports = mongoose.model("Salereport", SaleSchema);
