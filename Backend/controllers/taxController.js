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


exports.deletetax = async (req, res) => {
  try {
    const deleted = await Tax.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Tax not found" });
    }
    res.json({ message: "Tax deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};