import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ==================== AGENT CONTROLLERS ====================

// Create Agent
const createAgent = asyncHandler(async (req, res) => {
  const { name, email, phone, address, gst_number, bank_name, account_number, ifsc_code, account_holder } = req.body;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Agent name is required");
  }

  const agentExists = await prisma.agent.findUnique({ where: { name } });
  if (agentExists) {
    throw new ApiError(400, "Agent with this name already exists");
  }

  const agent = await prisma.agent.create({
    data: { name, email, phone, address, gst_number, bank_name, account_number, ifsc_code, account_holder },
  });

  return res.status(201).json(new ApiResponse(201, agent, "Agent created successfully"));
});

// Get All Agents
const getAllAgents = asyncHandler(async (req, res) => {
  const agents = await prisma.agent.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { invoices: true } } },
  });
  return res.status(200).json(new ApiResponse(200, agents, "Agents fetched successfully"));
});

// Update Agent
const updateAgent = asyncHandler(async (req, res) => {
  const { agentId } = req.params;

  const agent = await prisma.agent.findUnique({ where: { agent_id: agentId } });
  if (!agent) throw new ApiError(404, "Agent not found");

  const updatedAgent = await prisma.agent.update({
    where: { agent_id: agentId },
    data: req.body,
  });

  return res.status(200).json(new ApiResponse(200, updatedAgent, "Agent updated successfully"));
});

// Delete Agent
const deleteAgent = asyncHandler(async (req, res) => {
  const { agentId } = req.params;

  const agent = await prisma.agent.findUnique({ where: { agent_id: agentId } });
  if (!agent) throw new ApiError(404, "Agent not found");

  await prisma.agent.delete({ where: { agent_id: agentId } });

  return res.status(200).json(new ApiResponse(200, null, "Agent deleted successfully"));
});

// ==================== INVOICE CONTROLLERS ====================

// Auto-generate invoice number: INV-AGENTNAME-0001
const generateInvoiceNumber = async (agentName) => {
  const prefix = `INV-${agentName.replace(/\s+/g, "").toUpperCase().slice(0, 10)}`;
  
  const lastInvoice = await prisma.invoice.findFirst({
    where: { invoice_number: { startsWith: prefix } },
    orderBy: { invoice_number: "desc" },
  });

  let nextNumber = 1;
  if (lastInvoice) {
    const parts = lastInvoice.invoice_number.split("-");
    const lastNum = parseInt(parts[parts.length - 1]);
    nextNumber = lastNum + 1;
  }

  return `${prefix}-${String(nextNumber).padStart(4, "0")}`;
};

// Create Invoice
const createInvoice = asyncHandler(async (req, res) => {
  const { agent_id, hijri_year, items } = req.body;

  if (!agent_id) throw new ApiError(400, "Agent is required");
  if (!hijri_year) throw new ApiError(400, "Hijri year is required");
  if (!items || items.length === 0) throw new ApiError(400, "At least one item is required");

  const agent = await prisma.agent.findUnique({ where: { agent_id } });
  if (!agent) throw new ApiError(404, "Agent not found");

  const invoice_number = await generateInvoiceNumber(agent.name);

  const invoice = await prisma.invoice.create({
    data: {
      invoice_number,
      agent_id,
      hijri_year,
      items: {
        create: items.map((item) => ({
          particulars: item.particulars,
          pax_quantity: parseInt(item.pax_quantity),
          rate_per_pax: parseFloat(item.rate_per_pax),
          total_amount: parseInt(item.pax_quantity) * parseFloat(item.rate_per_pax),
        })),
      },
    },
    include: { items: true, agent: true },
  });

  return res.status(201).json(new ApiResponse(201, invoice, "Invoice created successfully"));
});

// Get All Invoices for an Agent
const getAgentInvoices = asyncHandler(async (req, res) => {
  const { agentId } = req.params;

  const agent = await prisma.agent.findUnique({ where: { agent_id: agentId } });
  if (!agent) throw new ApiError(404, "Agent not found");

  const invoices = await prisma.invoice.findMany({
    where: { agent_id: agentId },
    include: {
      items: true,
      payments: { orderBy: { payment_date: "asc" } },
    },
    orderBy: { created_at: "desc" },
  });

  // Add computed totals to each invoice
  const invoicesWithTotals = invoices.map((inv) => {
    const totalServices = inv.items.reduce((sum, item) => sum + parseFloat(item.total_amount), 0);
    const totalPaid = inv.payments.reduce((sum, p) => sum + parseFloat(p.amount_paid), 0);
    return { ...inv, totalServices, totalPaid, balance: totalServices - totalPaid };
  });

  return res.status(200).json(new ApiResponse(200, { agent, invoices: invoicesWithTotals }, "Invoices fetched successfully"));
});

// Get Single Invoice with Full Details
const getInvoiceById = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;

  const invoice = await prisma.invoice.findUnique({
    where: { invoice_id: invoiceId },
    include: {
      items: true,
      payments: { orderBy: { payment_date: "asc" } },
      agent: true,
    },
  });

  if (!invoice) throw new ApiError(404, "Invoice not found");

  const totalServices = invoice.items.reduce((sum, item) => sum + parseFloat(item.total_amount), 0);
  const totalPaid = invoice.payments.reduce((sum, p) => sum + parseFloat(p.amount_paid), 0);
  const balance = totalServices - totalPaid;

  return res.status(200).json(
    new ApiResponse(200, { ...invoice, totalServices, totalPaid, balance }, "Invoice fetched successfully")
  );
});

// Delete Invoice
const deleteInvoice = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;

  const invoice = await prisma.invoice.findUnique({ where: { invoice_id: invoiceId } });
  if (!invoice) throw new ApiError(404, "Invoice not found");

  await prisma.invoice.delete({ where: { invoice_id: invoiceId } });

  return res.status(200).json(new ApiResponse(200, null, "Invoice deleted successfully"));
});

// ==================== PAYMENT CONTROLLERS ====================

// Add Payment to Invoice
const addPayment = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;
  const { payment_date, amount_paid, received_by, notes } = req.body;

  if (!payment_date) throw new ApiError(400, "Payment date is required");
  if (!amount_paid || parseFloat(amount_paid) <= 0) throw new ApiError(400, "Valid amount is required");
  if (!received_by) throw new ApiError(400, "Received by is required");

  const invoice = await prisma.invoice.findUnique({ where: { invoice_id: invoiceId } });
  if (!invoice) throw new ApiError(404, "Invoice not found");

  const payment = await prisma.payment.create({
    data: {
      invoice_id: invoiceId,
      payment_date: new Date(payment_date),
      amount_paid: parseFloat(amount_paid),
      received_by,
      notes,
    },
  });

  return res.status(201).json(new ApiResponse(201, payment, "Payment recorded successfully"));
});

// Delete Payment
const deletePayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const payment = await prisma.payment.findUnique({ where: { payment_id: paymentId } });
  if (!payment) throw new ApiError(404, "Payment not found");

  await prisma.payment.delete({ where: { payment_id: paymentId } });

  return res.status(200).json(new ApiResponse(200, null, "Payment deleted successfully"));
});

// ==================== INVOICE ITEM CONTROLLERS ====================

// Add item to existing invoice
const addInvoiceItem = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;
  const { particulars, pax_quantity, rate_per_pax } = req.body;

  if (!particulars) throw new ApiError(400, "Particulars are required");
  if (!pax_quantity || !rate_per_pax) throw new ApiError(400, "PAX quantity and rate are required");

  const invoice = await prisma.invoice.findUnique({ where: { invoice_id: invoiceId } });
  if (!invoice) throw new ApiError(404, "Invoice not found");

  const item = await prisma.invoiceItem.create({
    data: {
      invoice_id: invoiceId,
      particulars,
      pax_quantity: parseInt(pax_quantity),
      rate_per_pax: parseFloat(rate_per_pax),
      total_amount: parseInt(pax_quantity) * parseFloat(rate_per_pax),
    },
  });

  return res.status(201).json(new ApiResponse(201, item, "Item added successfully"));
});

// Update existing invoice item
const updateInvoiceItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { particulars, pax_quantity, rate_per_pax } = req.body;

  const item = await prisma.invoiceItem.findUnique({ where: { item_id: itemId } });
  if (!item) throw new ApiError(404, "Invoice item not found");

  const updatedItem = await prisma.invoiceItem.update({
    where: { item_id: itemId },
    data: {
      particulars: particulars ?? item.particulars,
      pax_quantity: pax_quantity ? parseInt(pax_quantity) : item.pax_quantity,
      rate_per_pax: rate_per_pax ? parseFloat(rate_per_pax) : item.rate_per_pax,
      total_amount: (pax_quantity ? parseInt(pax_quantity) : item.pax_quantity) *
                    (rate_per_pax ? parseFloat(rate_per_pax) : parseFloat(item.rate_per_pax)),
    },
  });

  return res.status(200).json(new ApiResponse(200, updatedItem, "Item updated successfully"));
});

// Delete invoice item
const deleteInvoiceItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const item = await prisma.invoiceItem.findUnique({ where: { item_id: itemId } });
  if (!item) throw new ApiError(404, "Invoice item not found");

  await prisma.invoiceItem.delete({ where: { item_id: itemId } });

  return res.status(200).json(new ApiResponse(200, null, "Item deleted successfully"));
});

export {
  createAgent, getAllAgents, updateAgent, deleteAgent,
  createInvoice, getAgentInvoices, getInvoiceById, deleteInvoice,
  addPayment, deletePayment,
  addInvoiceItem, updateInvoiceItem, deleteInvoiceItem,
};
