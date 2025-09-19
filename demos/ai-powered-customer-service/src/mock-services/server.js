const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load mock data
const loadData = (filename) => {
    const dataPath = path.join(__dirname, '..', 'data', filename);
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

let customers = loadData('customers.json');
let orders = loadData('orders.json');
let supportTickets = loadData('support-tickets.json');

// Helper function to simulate processing delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// =====================
// CRM Service (Port 3001)
// =====================

// Get customer profile
app.get('/api/crm/customers/:customerId', async (req, res) => {
    await delay(100); // Simulate API latency

    const customerId = req.params.customerId;
    const customer = customers.find(c => c.customerId === customerId);

    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    console.log(`CRM API: Retrieved customer ${customerId}`);
    res.json({
        success: true,
        data: customer,
        timestamp: new Date().toISOString(),
        source: 'crm-service'
    });
});

// Update customer preferences
app.put('/api/crm/customers/:customerId/preferences', async (req, res) => {
    await delay(150);

    const customerId = req.params.customerId;
    const customerIndex = customers.findIndex(c => c.customerId === customerId);

    if (customerIndex === -1) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    customers[customerIndex].preferences = { ...customers[customerIndex].preferences, ...req.body };

    console.log(`CRM API: Updated preferences for customer ${customerId}`);
    res.json({
        success: true,
        message: 'Customer preferences updated',
        data: customers[customerIndex].preferences
    });
});

// =====================
// Order Service (Port 3002)
// =====================

// Get customer orders
app.get('/api/orders/customers/:customerId/orders', async (req, res) => {
    await delay(120);

    const customerId = req.params.customerId;
    const customerOrders = orders.filter(o => o.customerId === customerId);

    console.log(`Order API: Retrieved ${customerOrders.length} orders for customer ${customerId}`);
    res.json({
        success: true,
        data: customerOrders,
        count: customerOrders.length,
        timestamp: new Date().toISOString(),
        source: 'order-service'
    });
});

// Get specific order
app.get('/api/orders/:orderId', async (req, res) => {
    await delay(80);

    const orderId = req.params.orderId;
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    console.log(`Order API: Retrieved order ${orderId}`);
    res.json({
        success: true,
        data: order,
        timestamp: new Date().toISOString(),
        source: 'order-service'
    });
});

// Update order status
app.put('/api/orders/:orderId/status', async (req, res) => {
    await delay(200);

    const orderId = req.params.orderId;
    const { status, reason } = req.body;

    const orderIndex = orders.findIndex(o => o.orderId === orderId);

    if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' });
    }

    const oldStatus = orders[orderIndex].status;
    orders[orderIndex].status = status;
    orders[orderIndex].lastUpdated = new Date().toISOString();

    if (reason) {
        orders[orderIndex].statusReason = reason;
    }

    console.log(`Order API: Updated order ${orderId} status from ${oldStatus} to ${status}`);

    // Simulate different processing outcomes
    if (status === 'expedited') {
        orders[orderIndex].shipping.method = 'express';
        orders[orderIndex].shipping.estimatedDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }

    res.json({
        success: true,
        message: `Order status updated to ${status}`,
        data: {
            orderId: orderId,
            oldStatus: oldStatus,
            newStatus: status,
            reason: reason
        }
    });
});

// =====================
// Support Service (Port 3003)
// =====================

// Get customer support history
app.get('/api/support/customers/:customerId/tickets', async (req, res) => {
    await delay(90);

    const customerId = req.params.customerId;
    const customerTickets = supportTickets.filter(t => t.customerId === customerId);

    console.log(`Support API: Retrieved ${customerTickets.length} tickets for customer ${customerId}`);
    res.json({
        success: true,
        data: customerTickets,
        count: customerTickets.length,
        timestamp: new Date().toISOString(),
        source: 'support-service'
    });
});

// Create support ticket
app.post('/api/support/tickets', async (req, res) => {
    await delay(250);

    const newTicket = {
        ticketId: `TKT-${Date.now()}`,
        ...req.body,
        status: 'open',
        createdDate: new Date().toISOString().split('T')[0],
        assignedAgent: 'ai-agent-001'
    };

    supportTickets.push(newTicket);

    console.log(`Support API: Created ticket ${newTicket.ticketId} for customer ${newTicket.customerId}`);
    res.json({
        success: true,
        message: 'Support ticket created',
        data: newTicket
    });
});

// =====================
// Notification Service (Port 3004)
// =====================

// Send email notification
app.post('/api/notifications/email', async (req, res) => {
    await delay(300);

    const { customerId, emailType, subject, content, orderId } = req.body;

    console.log(`Notification API: Sending ${emailType} email to customer ${customerId}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${content.substring(0, 100)}...`);

    res.json({
        success: true,
        message: 'Email notification sent',
        data: {
            notificationId: `NOTIF-${Date.now()}`,
            customerId: customerId,
            type: 'email',
            emailType: emailType,
            status: 'delivered',
            sentAt: new Date().toISOString()
        }
    });
});

// Send SMS notification
app.post('/api/notifications/sms', async (req, res) => {
    await delay(200);

    const { customerId, message, orderId } = req.body;

    console.log(`Notification API: Sending SMS to customer ${customerId}: ${message}`);

    res.json({
        success: true,
        message: 'SMS notification sent',
        data: {
            notificationId: `SMS-${Date.now()}`,
            customerId: customerId,
            type: 'sms',
            status: 'delivered',
            sentAt: new Date().toISOString()
        }
    });
});

// =====================
// Health Check
// =====================

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        services: {
            crm: 'running',
            orders: 'running',
            support: 'running',
            notifications: 'running'
        },
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Mock Services Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log('');
    console.log('📋 Available Services:');
    console.log('  👤 CRM Service: /api/crm/customers/{customerId}');
    console.log('  📦 Order Service: /api/orders/{orderId}');
    console.log('  🎫 Support Service: /api/support/customers/{customerId}/tickets');
    console.log('  📧 Notification Service: /api/notifications/email');
    console.log('');
});

module.exports = app;
