const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const unitRoutes=require("./routes/unitRoutes")
const taxRoutes=require("./routes/taxRoutes")
const customerRoutes=require("./routes/customerRoutes")
const supplierRoutes=require("./routes/supplierRoutes")
const warehouseRoutes=require("./routes/warehouseRoutes")
const purchaseRoutes=require("./routes/purchaseRoutes")
const saleposRoutes=require("./routes/saleposRoutes")
const customerpaymentRoutes=require('./routes/customerpaymentRoutes')
const supplierpaymentRoutes=require("./routes/supplierpaymentRoutes")
const stockadjustmentRoutes=require("./routes/stockadjRoutes")
const reportRoutes=require("./routes/reportRoutes")
const userRoutes=require('./routes/userRoutes')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/inventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/units",unitRoutes)
app.use("/api/taxes",taxRoutes)
app.use("/api/customers",customerRoutes)
app.use("/api/suppliers",supplierRoutes)
app.use("/api/warehouses",warehouseRoutes)
app.use("/api/purchases",purchaseRoutes)
app.use("/api/sales",saleposRoutes)
app.use("/api/cus_receipts",customerpaymentRoutes)
app.use("/api/sup_receipts",supplierpaymentRoutes)
app.use("/api/stocksadj",stockadjustmentRoutes)
app.use("/api/reports", reportRoutes);
app.use("/api/users",userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
