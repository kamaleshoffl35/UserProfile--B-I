const mongoose = require("mongoose")

const customerPaymentSchema = new mongoose.Schema({
    customer_id : {type:String, ref: 'Customer'},
    date :{type:Date, required:true},
    amount:{type:Number,required:true},
    mode:{type:String,required:true},
    reference_no :{type:Number},
    applied_invoice_id:{type:String},
    notes:{type:String},
},
{timestamps:true})
 
module.exports = mongoose.model("CustomerPayment", customerPaymentSchema)