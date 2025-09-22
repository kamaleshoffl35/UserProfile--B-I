const express = require("express");
const {getSaleReports,addSaleReport, deleteSaleReport} = require("../controllers/saleReportController");
const {getPurchaseReports,addPurchaseReport, deletePurchaseReport} = require("../controllers/purchaseReportController");
const {getStockReports,addStockReport, deleteStockReport}=require("../controllers/stockReportController")
const {getGSTReports,addGSTReport, deletegstReport}=require("../controllers/gstReportController")
const router = express.Router();  

router.get("/sales", getSaleReports);
router.post("/sales", addSaleReport);
router.delete("/sales/:id",deleteSaleReport)

router.get("/purchase", getPurchaseReports);
router.post("/purchase", addPurchaseReport);
router.delete("/purchase/:id",deletePurchaseReport)

router.get("/stock",getStockReports)
router.post("/stock",addStockReport)
router.delete("/stock/:id",deleteStockReport)

router.get("/gst",getGSTReports)
router.post("/gst",addGSTReport)
router.delete("/gst/:id",deletegstReport)

module.exports = router;   