import { Router } from "express";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";
import {
  createAgent,
  getAllAgents,
  updateAgent,
  deleteAgent,
  createInvoice,
  getAgentInvoices,
  getInvoiceById,
  deleteInvoice,
  addPayment,
  deletePayment,
} from "../controllers/invoice.controller.js";

const router = Router();

// All routes are admin-protected
router.use(verifyAdminJwt);

// ---- AGENT ROUTES ----
router.route("/agents").get(getAllAgents).post(createAgent);
router.route("/agents/:agentId").put(updateAgent).delete(deleteAgent);
router.route("/agents/:agentId/invoices").get(getAgentInvoices);

// ---- INVOICE ROUTES ----
router.route("/").post(createInvoice);
router.route("/:invoiceId").get(getInvoiceById).delete(deleteInvoice);

// ---- PAYMENT ROUTES ----
router.route("/:invoiceId/payments").post(addPayment);
router.route("/payments/:paymentId").delete(deletePayment);

export default router;
