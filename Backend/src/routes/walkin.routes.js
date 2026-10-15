import { Router } from "express";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";
import {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerInvoices,
  createInvoice,
  getInvoiceById,
  deleteInvoice,
  addPayment,
  deletePayment,
  addInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
  reorderInvoiceItems,
  getPendingBalances,
} from "../controllers/walkin.controller.js";

const router = Router();
router.use(verifyAdminJwt);

// ---- CUSTOMER ROUTES ----
router.route("/customers").get(getAllCustomers).post(createCustomer);
router.route("/customers/:customerId").put(updateCustomer).delete(deleteCustomer);
router.route("/customers/:customerId/invoices").get(getCustomerInvoices);

// ---- PENDING BALANCES ----
router.route("/pending-balances").get(getPendingBalances);

// ---- INVOICE ROUTES ----
router.route("/invoices").post(createInvoice);
router.route("/invoices/:invoiceId").get(getInvoiceById).delete(deleteInvoice);

// ---- INVOICE ITEM ROUTES ----
router.route("/invoices/:invoiceId/items").post(addInvoiceItem);
router.route("/invoices/:invoiceId/items/reorder").patch(reorderInvoiceItems);
router.route("/items/:itemId").put(updateInvoiceItem).delete(deleteInvoiceItem);

// ---- PAYMENT ROUTES ----
router.route("/invoices/:invoiceId/payments").post(addPayment);
router.route("/payments/:paymentId").delete(deletePayment);

export default router;
