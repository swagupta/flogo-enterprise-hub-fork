# Customer Service Demo - Mock Services

This directory contains mock backend services that simulate the enterprise systems in our customer service scenario.

## Services Overview

### CRM Service (Customer Relationship Management)
- **Purpose**: Manages customer profiles, preferences, and tier status
- **Port**: 3001
- **Endpoints**:
  - `GET /api/crm/customers/{customerId}` - Retrieve customer profile
  - `PUT /api/crm/customers/{customerId}/preferences` - Update customer preferences

### Order Management Service  
- **Purpose**: Handles order tracking, status updates, and shipping information
- **Port**: 3002 (shared server)
- **Endpoints**:
  - `GET /api/orders/customers/{customerId}/orders` - Get customer order history
  - `GET /api/orders/{orderId}` - Get specific order details
  - `PUT /api/orders/{orderId}/status` - Update order status (expedite, cancel, etc.)

### Support Service
- **Purpose**: Manages support tickets and customer service history
- **Port**: 3003 (shared server)
- **Endpoints**:
  - `GET /api/support/customers/{customerId}/tickets` - Get customer support history
  - `POST /api/support/tickets` - Create new support ticket

### Notification Service
- **Purpose**: Handles email and SMS notifications to customers
- **Port**: 3004 (shared server)
- **Endpoints**:
  - `POST /api/notifications/email` - Send email notification
  - `POST /api/notifications/sms` - Send SMS notification

## Quick Start

1. **Install dependencies**:
   ```bash
   cd mock-services
   npm install
   ```

2. **Start the services**:
   ```bash
   npm start
   ```

3. **Health check**:
   ```bash
   curl http://localhost:3001/health
   ```

## Test Data

The services use realistic mock data located in the `../data/` directory:
- `customers.json` - Customer profiles with Gold/Platinum tiers
- `orders.json` - Order history with various statuses
- `support-tickets.json` - Support ticket history

## Example API Calls

### Get Customer Profile
```bash
curl http://localhost:3001/api/crm/customers/CUST-001
```

### Get Customer Orders
```bash
curl http://localhost:3001/api/orders/customers/CUST-001/orders
```

### Expedite an Order
```bash
curl -X PUT http://localhost:3001/api/orders/ORD-2024-001/status \
  -H "Content-Type: application/json" \
  -d '{"status":"expedited","reason":"Customer request via AI agent"}'
```

### Send Customer Email
```bash
curl -X POST http://localhost:3001/api/notifications/email \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "CUST-001",
    "emailType": "order_update",
    "subject": "Your order has been expedited",
    "content": "Good news! Your order ORD-2024-001 has been expedited and will arrive 2 days earlier.",
    "orderId": "ORD-2024-001"
  }'
```

## Architecture

These mock services simulate the backend systems that Flogo flows will interact with:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AI Agent      │◄──►│  Flogo Flows    │◄──►│  Mock Services  │
│   (Claude/GPT)  │    │  (MCP Server)   │    │  (This Server)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │  MCP Protocol   │
                       │  - Resources    │
                       │  - Tools        │
                       │  - Prompts      │
                       └─────────────────┘
```

The mock services provide realistic API responses with latency simulation to demonstrate how Flogo flows can aggregate data from multiple enterprise systems and expose them via the Model Context Protocol (MCP) for AI agent integration.
