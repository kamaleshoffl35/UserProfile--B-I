const SupplierPayment = require("../models/SupplierPayment")
const Supplier = require("../models/Supplier");

exports.getSupplierPayments = async (req, res) => {
    try {
        try {
            const receipts = await SupplierPayment.find().populate('supplier_id', 'name')
            res.json(receipts)
        }
        catch (err) {
            res.status(400).json({ error: err.message })
        }

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.addSupplierPayment = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.body.supplier_id);
        const receipt = new SupplierPayment({ ...req.body, supplier_name: supplier.name });
        await receipt.save();
        await receipt.populate("supplier_id", "name");

        res.json(receipt);
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}