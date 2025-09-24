const Salereport = require("../models/Salereport");

// const Expense = require("../models/Expense");
const Product = require("../models/Product");
const Purchasereport = require("../models/Purchasereport");

// Helper: date filter
const getDateQuery = (from, to) => {
  if (!from && !to) return {};
  const q = {};
  if (from) q.$gte = new Date(from + "T00:00:00.000Z");
  if (to) q.$lte = new Date(to + "T23:59:59.999Z");
  return q;
};

exports.getProfitLoss = async (req, res) => {
  try {
    const { from_date, to_date, warehouse_id, product_category, customer_type } = req.query;

    const dateQuery = getDateQuery(from_date, to_date);

    // --- SALES ---
    const salesMatch = {};
    if (Object.keys(dateQuery).length) salesMatch.invoice_date_time = dateQuery;
    if (warehouse_id) salesMatch.warehouse_id = warehouse_id;

    let sales = await Salereport.find(salesMatch)
      .populate("items.product_id", "purchase_price category")
      .populate("customer_id", "customer_type")
      .lean();

    // filter by category / customer_type
    if (product_category) {
      sales = sales.filter(si =>
        si.items.some(it => String(it.product_id?.category) === String(product_category))
      );
    }
    if (customer_type) {
      sales = sales.filter(si => si.customer_id?.customer_type === customer_type);
    }

    let totalSales = 0;
    let totalCOGS = 0;
    sales.forEach(si => {
      totalSales += si.grand_total || 0;
      si.items.forEach(it => {
        const pp = it.product_id?.purchase_price || 0;
        totalCOGS += (it.qty || 0) * pp;
      });
    });

    // --- PURCHASES ---
    const purchaseMatch = {};
    if (Object.keys(dateQuery).length) purchaseMatch.invoice_date = dateQuery;
    if (warehouse_id) purchaseMatch.warehouse_id = warehouse_id;

    const purchases = await Purchasereport.find(purchaseMatch).lean();
    let totalPurchases = purchases.reduce((acc, p) => acc + (p.grand_total || 0), 0);

    // --- EXPENSES ---
    const expenseMatch = {};
    if (Object.keys(dateQuery).length) expenseMatch.date = dateQuery;
    if (warehouse_id) expenseMatch.warehouse_id = warehouse_id;

    const expenses = await Expense.find(expenseMatch).lean();
    let totalExpenses = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);

    // --- CALCULATIONS ---
    const grossProfit = totalSales - totalCOGS;
    const netProfit = grossProfit - totalExpenses;

    res.json({
      period: { from_date, to_date },
      filters: { warehouse_id, product_category, customer_type },
      totals: {
        sales: totalSales,
        purchases: totalPurchases,
        cogs: totalCOGS,
        expenses: totalExpenses,
        gross_profit: grossProfit,
        net_profit: netProfit
      }
    });
  } catch (err) {
    console.error("ProfitLoss error:", err);
    res.status(500).json({ error: err.message });
  }
};
