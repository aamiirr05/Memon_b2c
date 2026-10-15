import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ==================== CUSTOMER CONTROLLERS ====================

// Create Customer
const createCustomer = asyncHandler(async (req, res) => {
  const { name, phone, email, address } = req.body;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Customer name is required");
  }
  if (!phone || phone.trim() === "") {
    throw new ApiError(400, "Customer phone number is required");
  }

  const customer = await prisma.walkInCustomer.create({
    data: {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      address: address ? address.trim() : null,
    },
  });

  return res.status(201).json(new ApiResponse(201, customer, "Customer created successfully"));
});

// Get All Customers
const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await prisma.walkInCustomer.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { invoices: true } } },
  });
  return res.status(200).json(new ApiResponse(200, customers, "Customers fetched successfully"));
});

// Update Customer
const updateCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  const { name, phone, email, address } = req.body;

  const customer = await prisma.walkInCustomer.findUnique({ where: { id: customerId } });
  if (!customer) throw new ApiError(404, "Customer not found");

  const updatedCustomer = await prisma.walkInCustomer.update({
    where: { id: customerId },
    data: {
      ...(name !== undefined && { name: name.trim() }),
      ...(phone !== undefined && { phone: phone.trim() }),
      ...(email !== undefined && { email: email ? email.trim() : null }),
      ...(address !== undefined && { address: address ? address.trim() : null }),
    },
  });

  return res.status(200).json(new ApiResponse(200, updatedCustomer, "Customer updated successfully"));
});

// Delete Customer
const deleteCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const customer = await prisma.walkInCustomer.findUnique({ where: { id: customerId } });
  if (!customer) throw new ApiError(404, "Customer not found");

  await prisma.walkInCustomer.delete({ where: { id: customerId } });

  return res.status(200).json(new ApiResponse(200, null, "Customer deleted successfully"));
});

// ==================== INVOICE CONTROLLERS ====================

// Auto-generate invoice number: INV-WI-0001
const generateInvoiceNumber = async () => {
  const prefix = "INV-WI";
  const lastInvoice = await prisma.walkInInvoice.findFirst({
    where: { invoice_number: { startsWith: prefix } },
    orderBy: { created_at: "desc" },
  });

  let nextNumber = 1;
  if (lastInvoice && lastInvoice.invoice_number) {
    const parts = lastInvoice.invoice_number.split("-");
    const lastNum = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(lastNum)) {
      nextNumber = lastNum + 1;
    }
  }

  return `${prefix}-${String(nextNumber).padStart(4, "0")}`;
};

// Create Invoice (All-in-One: Customer + Invoice + Services + Initial Payment)
const createInvoice = asyncHandler(async (req, res) => {
  let { customer_id, customer_name, customer_phone, customer_email, customer_address, customer: customerData, hijri_year, items, payment } = req.body;

  let targetCustomer = null;

  // 1. Resolve or Create Customer
  if (customer_id) {
    targetCustomer = await prisma.walkInCustomer.findUnique({ where: { id: customer_id } });
    if (!targetCustomer) throw new ApiError(404, "Selected customer not found");
  } else {
    const name = (customer_name || customerData?.name || "").trim();
    const phone = (customer_phone || customerData?.phone || "").trim();
    const email = (customer_email || customerData?.email || "").trim() || null;
    const address = (customer_address || customerData?.address || "").trim() || null;

    if (!name) throw new ApiError(400, "Customer name is required");
    if (!phone) throw new ApiError(400, "Customer phone number is required");

    // Check if customer with this phone already exists to avoid duplicates
    targetCustomer = await prisma.walkInCustomer.findFirst({
      where: { phone },
    });

    if (!targetCustomer) {
      targetCustomer = await prisma.walkInCustomer.create({
        data: { name, phone, email, address },
      });
    }
  }

  if (!hijri_year) throw new ApiError(400, "Hijri year is required");
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, "At least one item is required");
  }

  // 2. Generate Invoice Number
  let invoice_number = await generateInvoiceNumber();

  let existing = await prisma.walkInInvoice.findUnique({ where: { invoice_number } });
  let attempts = 0;
  while (existing && attempts < 10) {
    const parts = invoice_number.split("-");
    const nextNum = parseInt(parts[parts.length - 1], 10) + 1;
    invoice_number = `INV-WI-${String(nextNum).padStart(4, "0")}`;
    existing = await prisma.walkInInvoice.findUnique({ where: { invoice_number } });
    attempts++;
  }

  // 3. Prepare initial payment if provided
  const initialPayments = [];
  if (payment && parseFloat(payment.amount_paid) > 0) {
    const pDate = payment.payment_date ? new Date(payment.payment_date) : new Date();
    initialPayments.push({
      payment_date: isNaN(pDate.getTime()) ? new Date() : pDate,
      amount_paid: parseFloat(payment.amount_paid),
      received_by: String(payment.received_by || "MEMON"),
      notes: payment.notes ? String(payment.notes) : null,
    });
  }

  // 4. Create Invoice with Items and Payments
  const invoice = await prisma.walkInInvoice.create({
    data: {
      invoice_number,
      customer_id: targetCustomer.id,
      hijri_year: String(hijri_year),
      items: {
        create: items.map((item, index) => {
          const qty = parseInt(item.pax_quantity, 10) || 1;
          const rate = parseFloat(item.rate_per_pax) || 0;
          return {
            particulars: item.particulars || "",
            pax_quantity: qty,
            rate_per_pax: rate,
            total_amount: qty * rate,
            sort_order: index,
          };
        }),
      },
      ...(initialPayments.length > 0 && {
        payments: {
          create: initialPayments,
        },
      }),
    },
    include: {
      customer: true,
      items: { orderBy: [{ sort_order: "asc" }, { created_at: "asc" }] },
      payments: true,
    },
  });

  const totalServices = invoice.items.reduce((sum, item) => sum + parseFloat(item.total_amount), 0);
  const totalPaid = invoice.payments.reduce((sum, p) => sum + parseFloat(p.amount_paid), 0);
  const balance = totalServices - totalPaid;

  return res.status(201).json(
    new ApiResponse(201, { ...invoice, totalServices, totalPaid, balance }, "Invoice created successfully")
  );
});

// Get All Invoices for a Customer
const getCustomerInvoices = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const customer = await prisma.walkInCustomer.findUnique({ where: { id: customerId } });
  if (!customer) throw new ApiError(404, "Customer not found");

  const invoices = await prisma.walkInInvoice.findMany({
    where: { customer_id: customerId },
    include: {
      items: { orderBy: [{ sort_order: "asc" }, { created_at: "asc" }] },
      payments: { orderBy: { payment_date: "asc" } },
    },
    orderBy: { created_at: "desc" },
  });

  const enrichedInvoices = invoices.map((inv) => {
    const totalServices = inv.items.reduce((sum, item) => sum + parseFloat(item.total_amount), 0);
    const totalPaid = inv.payments.reduce((sum, p) => sum + parseFloat(p.amount_paid), 0);
    const balance = totalServices - totalPaid;
    return { ...inv, totalServices, totalPaid, balance };
  });

  return res.status(200).json(
    new ApiResponse(200, { customer, invoices: enrichedInvoices }, "Invoices fetched successfully")
  );
});

// Get Single Invoice By ID
const getInvoiceById = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;

  const invoice = await prisma.walkInInvoice.findUnique({
    where: { id: invoiceId },
    include: {
      customer: true,
      items: { orderBy: [{ sort_order: "asc" }, { created_at: "asc" }] },
      payments: { orderBy: { payment_date: "asc" } },
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

  const invoice = await prisma.walkInInvoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new ApiError(404, "Invoice not found");

  await prisma.walkInInvoice.delete({ where: { id: invoiceId } });

  return res.status(200).json(new ApiResponse(200, null, "Invoice deleted successfully"));
});

// ==================== PAYMENT CONTROLLERS ====================

// Add Payment to Invoice
const addPayment = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;
  const { payment_date, amount_paid, received_by, notes } = req.body;

  if (!payment_date) throw new ApiError(400, "Payment date is required");
  const parsedDate = new Date(payment_date);
  if (isNaN(parsedDate.getTime())) throw new ApiError(400, "Invalid payment date");

  const parsedAmount = parseFloat(amount_paid);
  if (isNaN(parsedAmount) || parsedAmount <= 0) throw new ApiError(400, "Valid amount is required");
  if (!received_by) throw new ApiError(400, "Received by is required");

  const invoice = await prisma.walkInInvoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new ApiError(404, "Invoice not found");

  const payment = await prisma.walkInPayment.create({
    data: {
      invoice_id: invoiceId,
      payment_date: parsedDate,
      amount_paid: parsedAmount,
      received_by: String(received_by),
      notes: notes ? String(notes) : null,
    },
  });

  return res.status(201).json(new ApiResponse(201, payment, "Payment recorded successfully"));
});

// Delete Payment
const deletePayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const payment = await prisma.walkInPayment.findUnique({ where: { id: paymentId } });
  if (!payment) throw new ApiError(404, "Payment not found");

  await prisma.walkInPayment.delete({ where: { id: paymentId } });

  return res.status(200).json(new ApiResponse(200, null, "Payment deleted successfully"));
});

// ==================== INVOICE ITEM CONTROLLERS ====================

// Add item to existing invoice
const addInvoiceItem = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;
  const { particulars, pax_quantity, rate_per_pax } = req.body;

  if (!particulars || particulars.trim() === "") throw new ApiError(400, "Particulars is required");
  const qty = parseInt(pax_quantity, 10) || 1;
  const rate = parseFloat(rate_per_pax) || 0;

  const invoice = await prisma.walkInInvoice.findUnique({
    where: { id: invoiceId },
    include: { items: true },
  });
  if (!invoice) throw new ApiError(404, "Invoice not found");

  const maxSortOrder = invoice.items.reduce((max, it) => Math.max(max, it.sort_order || 0), -1);

  const item = await prisma.walkInInvoiceItem.create({
    data: {
      invoice_id: invoiceId,
      particulars: particulars.trim(),
      pax_quantity: qty,
      rate_per_pax: rate,
      total_amount: qty * rate,
      sort_order: maxSortOrder + 1,
    },
  });

  return res.status(201).json(new ApiResponse(201, item, "Item added successfully"));
});

// Reorder invoice items
const reorderInvoiceItems = asyncHandler(async (req, res) => {
  const { invoiceId } = req.params;
  const { itemIds } = req.body;

  if (!itemIds || !Array.isArray(itemIds)) {
    throw new ApiError(400, "itemIds array is required");
  }

  const invoice = await prisma.walkInInvoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new ApiError(404, "Invoice not found");

  await prisma.$transaction(
    itemIds.map((itemId, index) =>
      prisma.walkInInvoiceItem.update({
        where: { id: itemId },
        data: { sort_order: index },
      })
    )
  );

  return res.status(200).json(new ApiResponse(200, null, "Items reordered successfully"));
});

// Update existing invoice item
const updateInvoiceItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { particulars, pax_quantity, rate_per_pax } = req.body;

  const item = await prisma.walkInInvoiceItem.findUnique({ where: { id: itemId } });
  if (!item) throw new ApiError(404, "Invoice item not found");

  const qty = pax_quantity !== undefined ? (parseInt(pax_quantity, 10) || 1) : item.pax_quantity;
  const rate = rate_per_pax !== undefined ? (parseFloat(rate_per_pax) || 0) : parseFloat(item.rate_per_pax);

  const updatedItem = await prisma.walkInInvoiceItem.update({
    where: { id: itemId },
    data: {
      ...(particulars !== undefined && { particulars: particulars.trim() }),
      pax_quantity: qty,
      rate_per_pax: rate,
      total_amount: qty * rate,
    },
  });

  return res.status(200).json(new ApiResponse(200, updatedItem, "Item updated successfully"));
});

// Delete invoice item
const deleteInvoiceItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const item = await prisma.walkInInvoiceItem.findUnique({ where: { id: itemId } });
  if (!item) throw new ApiError(404, "Invoice item not found");

  await prisma.walkInInvoiceItem.delete({ where: { id: itemId } });

  return res.status(200).json(new ApiResponse(200, null, "Item deleted successfully"));
});

// ==================== PENDING BALANCES ====================

const getPendingBalances = asyncHandler(async (req, res) => {
  const allInvoices = await prisma.walkInInvoice.findMany({
    include: {
      customer: true,
      items: { orderBy: [{ sort_order: "asc" }, { created_at: "asc" }] },
      payments: true,
    },
    orderBy: { created_at: "desc" },
  });

  // Calculate balance for each invoice
  const pendingInvoices = allInvoices
    .map((inv) => {
      const totalServices = inv.items.reduce((sum, item) => sum + parseFloat(item.total_amount), 0);
      const totalPaid     = inv.payments.reduce((sum, p)  => sum + parseFloat(p.amount_paid), 0);
      const balance       = totalServices - totalPaid;
      return { ...inv, totalServices, totalPaid, balance };
    })
    .filter((inv) => inv.balance > 0);

  // Group by customer
  const byCustomer = {};
  for (const inv of pendingInvoices) {
    const id = inv.customer.id;
    if (!byCustomer[id]) {
      byCustomer[id] = {
        customer: inv.customer,
        invoices: [],
        totalPending: 0,
      };
    }
    byCustomer[id].invoices.push(inv);
    byCustomer[id].totalPending += inv.balance;
  }

  const grouped = Object.values(byCustomer).sort((a, b) => b.totalPending - a.totalPending);
  const grandTotal = grouped.reduce((sum, c) => sum + c.totalPending, 0);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        customers: grouped,
        grandTotal,
        totalCustomers: grouped.length,
        totalInvoices: pendingInvoices.length,
      },
      "Pending balances fetched successfully"
    )
  );
});

export {
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
};
