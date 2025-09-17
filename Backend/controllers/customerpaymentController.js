const CustomerPayment = require("../models/CustomerPayment")

exports.getCustomerPayments = async (req, res) => {
    try {
        const receipts = await CustomerPayment.find().populate('customer_id','name')
        res.json(receipts)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.addCustomerPayment = async (req, res) => {
    try {
        const receipt = new CustomerPayment(req.body)
        await receipt.save()
        await receipt.populate('customer_id','name')
        res.json(receipt)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}