const Unit = require('../models/Unit')

exports.getUnits = async (req, res) => {
    try {
        const units = await Unit.find()
        res.json(units)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}
exports.addUnit = async (req, res) => {
    try {
        const unit = new Unit(req.body);
        await unit.save();
        res.json(unit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
