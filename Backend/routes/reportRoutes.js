const express = require("express");
const {getSaleReports,addSaleReport} = require("../controllers/saleReportController");
const {getPurchaseReports,addPurchaseReport} = require("../controllers/purchaseReportController");
const {getStockReports,addStockReport}=require("../controllers/stockReportController")
const {getGSTReports,addGSTReport}=require("../controllers/gstReportController")
const router = express.Router();  

router.get("/sales", getSaleReports);
router.post("/sales", addSaleReport);

router.get("/purchase", getPurchaseReports);
router.post("/purchase", addPurchaseReport);

router.get("/stock",getStockReports)
router.post("/stock",addStockReport)

router.get("/gst",getGSTReports)
router.post("/gst",addGSTReport)

module.exports = router;   