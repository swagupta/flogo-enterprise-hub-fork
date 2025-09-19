# AI-Powered Customer Service  with Flogo MCP

## 🎯 Demo Overview

This demo showcases how enterprises can transform their business logic into AI-accessible tools using Flogo's Model Context Protocol (MCP) implementation. We'll build a complete customer service AI agent that securely interacts with enterprise systems through three MCP primitives: Resources, Tools, and Prompts.


## 🎬 Demo Scenario: 
### **Characters**:
- **Sophia**: Customer service representative
- **Sarah**: Frustrated customer with order issues
- **AI Assistant**: Claude/ChatGPT connected via Flogo MCP
- **Enterprise Systems**: CRM, Order Management, Email System

### **Scene 1: The Problem**
Sarah calls about a delayed order for special event over weekend. Traditional approach would require:
- Multiple system logins
- Manual data gathering
- Complex approval processes
- Risk of human error

### **Scene 2: The AI-Powered Solution**
Sophia asks her AI assistant to help. The AI, connected through Flogo MCP:
1. **Queries customer data** (Resource) - Gets Sarah's complete profile
2. **Processes order update** (Tool) - Expedites the order automatically
3. **Generates apology email** (Prompt) - Creates personalized communication
4. **Send apology email** (Tool) - Sends generated personalised email communication

### **Scene 3: The Magic Behind the Scenes**
- AI never directly accesses databases
- All actions flow through secure Flogo workflows
- Business rules (required) and permissions are enforced
- Complete audit trail of interaction is maintained

## 🏗️ Technical Architecture

![Technical Architecture](src/Technical%20Architecture.svg)

### **System Components**:
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   AI Agent      │    │  Flogo MCP       │    │  Enterprise         │
│  (Claude/GPT)   │◄──►│  Server          │◄──►│  Systems            │
│                 │    │                  │    │  ┌─────────────────┐│
│ - Query data    │    │ ┌──────────────┐ │    │  │ CRM Database    ││
│ - Execute tasks │    │ │ Resource:    │ │    │  │ Order System    ││
│ - Generate text │    │ │ Customer     │ │    │  │ Email Service   ││
└─────────────────┘    │ │ Profile      │ │    │  │ Billing System  ││
                       │ └──────────────┘ │    │  └─────────────────┘│
                       │ ┌──────────────┐ │    └─────────────────────┘
                       │ │ Tool:        │ │
                       │ │ Order        │ │
                       │ │ Processing   │ │
                       │ └──────────────┘ │
                       │ ┌──────────────┐ │
                       │ │ Prompt:      │ │
                       │ │ Email        │ │
                       │ │ Templates    │ │
                       │ └──────────────┘ │
                       └──────────────────┘
```


## 🎬 Demo Video

### Complete Demo Walkthrough

[![Flogo MCP Customer Service Demo](https://img.youtube.com/vi/-XZ6GThtzLE/maxresdefault.jpg)](https://www.youtube.com/watch?v=-XZ6GThtzLE)

*Click the thumbnail above to watch the complete AI-driven customer service demo on YouTube*

### What You'll See:
1. 🔍 **Customer data retrieval** using MCP Resources
2. ⚡ **Order expediting** using MCP Tools  
3. ✉️ **Email generation** using MCP Prompts
4. 🔗 **Seamless AI integration** with enterprise systems

---

## 🚀 How to Run the Demo

### Prerequisites
- Node.js (v16 or higher)
- Go (v1.19 or higher) 
- Flogo Dev Environment & CLI
- Claude Desktop, Cursor, or VS Code with MCP support

### Step 1: Start Mock Services
Navigate to the mock services directory and start the backend APIs:

```bash
cd mock-services
npm install
npm start
```

This will start the mock CRM, Order Management, and Support systems on `http://localhost:3001`.

### Step 2: Build and Run Flogo MCP Application

#### Option A: Using Pre-built Binary
```bash
# Navigate to the bin directory
cd ../bin

# Make the binary executable (on macOS/Linux)
chmod +x ai-customer-service-mcp

# Run the MCP server
./ai-customer-service-mcp
```

#### Option B: Build from Source
```bash
# Navigate to the flogo-flows directory
cd flogo-flows

# Build the application
fcli build

# Run the built application
./bin/ai-customer-service-mcp
```

The Flogo MCP server will start on `http://localhost:9998`.

### Step 3: Configure MCP Server in AI Assistant

#### For Claude Desktop:
1. Open Claude Desktop settings
2. Navigate to "Developer" or "MCP Servers" section
3. Add a new server configuration:
   ```json
   {
     "ai-customer-service": {
       "command": "npx",
       "args": ["mcp-remote", "http://localhost:9998/mcp"]
     }
   }
   ```
4. Restart Claude Desktop

#### For Cursor/VS Code:
1. Install the MCP extension
2. Open settings and add MCP server:
   ```json
   {
     "mcp.servers": {
       "ai-customer-service": {
         "command": "npx", 
         "args": ["mcp-remote", "http://localhost:9998/mcp"]
       }
     }
   }
   ```
3. Reload the window

### Step 4: Test the Demo

Once configured, you can test the following capabilities:

#### 1. Query Customer Data (Resource)
Ask your AI assistant:
```
"Get customer information for customer ID 12345"
```

#### 2. Expedite Orders (Tool)
Ask your AI assistant:
```
"Expedite order ORD-789 for customer 12345 due to shipping delay"
```

#### 3. Generate Customer Emails (Prompt)
Ask your AI assistant:
```
"Generate an apology email for customer John Doe about delayed order ORD-789"
```

### Troubleshooting

#### Common Issues:
1. **MCP Server Not Found**: Ensure the Flogo application is running on port 9998
2. **Mock Services Unavailable**: Verify mock services are running on port 8080
3. **Resource Not Discoverable**: Check the MCP server logs for any property resolution errors



### Demo Data
The mock services include sample data for:
- **Customers**: IDs 12345, 67890, 11111
- **Orders**: ORD-789, ORD-456, ORD-123  
- **Support Tickets**: TKT-001, TKT-002, TKT-003




---

*This demo showcases the future of enterprise AI integration - secure, scalable, and governed through proven integration patterns.*
