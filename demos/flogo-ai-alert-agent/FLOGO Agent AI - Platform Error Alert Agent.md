
## Introduction

With **TIBCO Flogo®  Agentic AI and the **TIBCO Platform Model Context Protocol (MCP) Services** enterprises can now build autonomous goal driven **AI-Agents**, enabling secure, intelligent automation across CRM, order management, and communication systems.

This demo showcases how Flogo AI Agent Activity can assist you in problem determination and error handling of applications running in the TIBCO platform, as an **AI-powered Alert Agent**.

## Demo Overview

 **In this demonstration, we build an **Autonomous AI agent** using the Flogo AI Agent activity. 
 It illustrates how the MCP services of TIBCO Platform can be used as **Tools**.** And work together to connect AI models (like Claude or OpenAI model) in the Agentic context.

![image info](images/AI_Alert_Agent.png)

The scenario starts in TIBCO Platform, where the Alerts configuration is used to monitor error situations on Flogo applications deployed in platform. When the alert conditions are met, the TIBCO Platform will send an alert to the AI Agent for further error investigation. For communication the newly introduced Webhook support from platform version 1.17 is used to communicate to the Flogo AI Agent. 

The TIBCO Platform MCP services helping the autonomous AI Agent to collect relevant data on the erroneous application. The AI Agent Reports back its findings in logged response.
This is done by a multi step approach fed into the user prompt of the AI Agent.

```
Perform the following steps to work to an answer:  

Step 1: From the received email. Determine the  application name and 'affected DP' data plane name that has produced the error from the alert message.
Step 2: Find the application in the 'Affected DP' data plane and determine the dataplaneid that runs this application. Retrieve the 'application name' from the alert message.
Step 3: Determine via the right tool if the 'applicationId' in the 'dataplaneId'  is a 'FLOGO', 'BWCE' or a 'BW5CE' application type.
Step 4: Determine the application runtime status of the faulty application with the 'applicationId'.
Step 5: Gather all other application information that can be found using the tools on 'applicationId' and 'data-plane-id' 
Step 6: Try to find the error in the Observability and trace information of this application with the 'applicationId' and 'data-plane-id'. 
Create a nice overview of all relevant data from the application causing the error notification. Summarize in plain text, show these details in the summary: 'Alert name', 'Alert Description', 'Event Type', 'Value', 'Timestamp', 'Affected DP', 'DataplaneId', 'Capability Type', 'Affected app', 'Runtime Status of the Affected app', 'Alert message'.
```