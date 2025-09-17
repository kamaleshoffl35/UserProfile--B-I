const Supplier = require("../models/Supplier")

exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find()
        res.json(suppliers)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.addSupplier = async (req, res) => {
    try {
        const supplier = new Supplier(req.body)
        await supplier.save()
        res.json(supplier)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}