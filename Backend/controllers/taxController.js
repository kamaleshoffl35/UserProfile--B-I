const Tax = require("../models/Tax");

exports.getTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find()
    res.json(taxes)
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }

}

exports.addTax = async (req, res) => {
  try {
    const tax = new Tax(req.body)
    await tax.save()
    res.json(tax)
  }
  catch (err) {
    res.status(400).json({ error: err.message })
  }
}
