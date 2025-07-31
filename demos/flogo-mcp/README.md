# 🧠 TIBCO Flogo® Model Context Protocol(MCP) Customer 360 Sample

## Overview

This sample demonstrates how to use **TIBCO Flogo® Connector for Model Context Protocol (MCP)
Developer Preview** to expose **Customer 360 data** — including **customers**, **products**, and **sales** — using the **Model Context Protocol (MCP)**. Once deployed, the Flogo MCP Server acts as an intelligent data orchestrator, enabling **AI agents** to query the data using **natural language (NLP)** without requiring any manual orchestration logic from the user.

## ✨ Key Features

- 🧩 **Expose business data as MCP tools**  
  Provides access to customer, product, and sales data

- 🤖 **NLP-ready interface for AI agents**  
  Seamless integration with AI Agents like Claude Desktop or GitHub Copilot in VS Code to issue natural language queries

- 🔁 **Automatic orchestration**  
  No need to write or manage orchestration logic — **Flogo MCP Server** handles it for you

- 🗃️ **Prebuilt sample datasets**  
  Includes mock data for sales, customer profiles, and product purchases

- 📊 **Supports business-centric queries**, like:
  - _"Show me sales for Q1 2025"_
  - _"List customer names who have purchased more than 2 products and their details"_

## 🚀 Getting Started

### Prerequisites

- TIBCO Flogo® Extension for Visual Studio Code 1.3.2 and above
- Any AI agent client capable of interacting with MCP Servers like Claude Desktop, GitHub Copilot etc


## Import the sample apps in the Workspace
   Import CustProdSaleAPI.flogo, Customer360MCPServer.flogo in VS Code.
   
## Understanding the configuration
   CustProdSaleAPI.flogo app is a REST API server which will return dummy customers, products, sales data.
   Customer360MCPServer.flogo app is a FLOGO MCP server app which will expose these customers, products, sales data as MCP server tools to AI Agents.

## Run the application
  - Run CustProdSaleAPI.flogo app which will start the API server and you can access these endpoints - http://localhost:18080/products, http://localhost:18080/customers, http://localhost:18080/sales

  - Run Customer360MCPServer.flogo app which start FLOGO MCP Server at http://localhost:9091/mcp. You can configure this MCP Server url with Claude Desktop or GitHub Copilot in VS Code and send querries in natural language
