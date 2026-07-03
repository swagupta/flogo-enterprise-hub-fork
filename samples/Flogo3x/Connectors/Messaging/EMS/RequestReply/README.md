# EMS Request-Reply (Topic with Message Properties) — Flogo 3.x

## Overview

This sample demonstrates the **synchronous request-reply messaging pattern** over TIBCO Enterprise Message Service (EMS) using the **TIBCO Flogo® 3.x** folder-based project format. A REST call triggers a request that is published to an EMS topic; a second flow consumes that request and publishes a reply back, which is returned to the original REST caller.

It exercises the core EMS connector capabilities:

| Building block | Activity / Trigger | What it shows |
|---|---|---|
| **EMS Request Reply** | `#requestreply` activity | Sends a request to an EMS destination and waits for the correlated reply |
| **EMS Receive Message** | `#receivemessage` trigger | Subscribes to a topic; each message starts a new flow |
| **EMS Acknowledge** | `#acknowledge` activity | Acknowledges the received EMS message |
| **EMS Send Message** | `#sendmessage` activity | Publishes the reply message back to the reply destination |
| **REST** | `#rest` trigger | `GET /request` entry point that kicks off the request flow |

> This sample was migrated from the Flogo 2.x app `Request_Reply_Topic_MessageProperties.flogo` to the 3.x project structure using the Flogo VS Code migration utility. See [About this migration](#about-this-migration).

---

## Architecture

```
  Client (curl / browser / Postman)
      |
      |  GET http://localhost:9999/request
      v
 +----------------------------------------------------------------------+
 |  Request_Reply_Topic_MessageProperties  (Flogo 3.x app)              |
 |                                                                      |
 |  REST Trigger (ReceiveHTTPMessage, port 9999)                        |
 |        |                                                             |
 |        v                                                             |
 |  RequstFlow                                                          |
 |    noop -> EMSRequestReply -> Log -> Log -> Return                   |
 |                  |   ^                                               |
 |     publish req  |   |  correlated reply                            |
 |                  v   |                                               |
 |            [ EMS topic: requesttopic ]  <----- Reply_To: replytopic  |
 |                  |                                                    |
 |                  v                                                    |
 |  EMS Receive Trigger (ReceiveEMSMessage, Topic=requesttopic, Sync)   |
 |        |                                                             |
 |        v                                                             |
 |  ReplyFlow                                                           |
 |    noop -> Log -> Log -> EMSAcknowledge -> EMSSendMessage -> Log     |
 |                                                 |                    |
 |                                                 v                    |
 |                                        [ EMS topic: replytopic ]     |
 +----------------------------------------------------------------------+
```

- **RequstFlow** is triggered by `GET /request`. It uses the **EMS Request Reply** activity to publish onto `requesttopic` and blocks until a reply arrives on `replytopic`, then returns it in the REST response.
- **ReplyFlow** is triggered by the **EMS Receive Message** trigger subscribed to `requesttopic`. It acknowledges the message and uses **EMS Send Message** to publish the reply to `replytopic`.

---

## Files in This Sample

The Flogo 3.x app is a folder-based project (not a single `.flogo` file):

| Path | Description |
|---|---|
| `Request_Reply_Topic_MessageProperties/app.fgmd` | App metadata (`flogoVersion: 3.0.0`, name, version) |
| `Request_Reply_Topic_MessageProperties/app.fgprops` | App properties — EMS connection settings and destination configuration |
| `Request_Reply_Topic_MessageProperties/triggers/ReceiveHTTPMessage.fgtrigger` | REST trigger — `GET /request` on port `9999` → `RequstFlow` |
| `Request_Reply_Topic_MessageProperties/triggers/ReceiveEMSMessage.fgtrigger` | EMS Receive trigger — Topic subscription (Sync) → `ReplyFlow` |
| `Request_Reply_Topic_MessageProperties/flows/RequstFlow.fgflow` | Request flow — EMS Request Reply, then Return |
| `Request_Reply_Topic_MessageProperties/flows/ReplyFlow.fgflow` | Reply flow — Acknowledge, then EMS Send Message |
| `Request_Reply_Topic_MessageProperties/connections/EMSmtlsfalse.fgconn` | EMS connection used by the triggers/activities |
| `Request_Reply_Topic_MessageProperties/connections/EMS-GCPconn.fgconn` | Secondary EMS connection resource |

---

## Prerequisites

- **TIBCO Flogo® 3.x extension for Visual Studio Code** installed. See the [TIBCO Flogo Extension for Visual Studio Code documentation](https://docs.tibco.com/products/tibco-flogo-extension-for-visual-studio-code-latest).
- A running **TIBCO EMS broker** reachable from your machine (authentication mode `None` or `SSL`). The broker must be up before you run the app.
- **TIBCO EMS Client version 10.3.0 or higher** installed locally, with the **EMS HOME** path available for the local runtime.
- A configured **Local Runtime** in the Flogo VS Code extension with the **EMS HOME** path set (Flogo icon → Local Runtime → Edit Runtime → add EMS HOME → Save).
- If your EMS broker is hosted on a cloud VM (e.g., AWS EC2), ensure the broker host/port is reachable and your public IP is whitelisted.

> **Platform note:** Because the EMS connector depends on an OS-specific EMS client library, cross-platform executables cannot be built (e.g., a Linux binary on Windows is not supported for EMS apps).

---

## Setup & Run

### Step 1 — Open the app in VS Code

Open this `RequestReply` folder in Visual Studio Code with the Flogo 3.x extension. The extension detects the `Request_Reply_Topic_MessageProperties` project (folder containing `app.fgmd`).

### Step 2 — Configure App Properties

In the Flogo app **App Properties**, set the EMS connection and destinations for your environment (see the [App Properties Reference](#app-properties-reference) below). At minimum, set:

```
EMS.EMSmtlsfalse.ServerUrl  = <your EMS server URL, e.g. tcp://localhost:7222 or ssl://host:7223>
EMS.EMSmtlsfalse.User_Name  = <your EMS user>
EMS.EMSmtlsfalse.Password   = <your EMS password>
```

The request/reply destinations default to:

```
Destination_Type      = Topic
Destination           = requesttopic
Reply_To_Destination  = replytopic
```

If `Authentication Mode` is `SSL`, also configure the certificate properties (`CA_or_Server_Certificate`, and — when `Enable_mTLS` is `true` — the client certificate and key).

### Step 3 — Select the Local Runtime

Select the local runtime that has the EMS HOME configured: click the **FLOGO APP** in the explorer → **Actions** → choose your Local Runtime.

### Step 4 — Build

In the **FLOGO APP** section, click **Build**. On success, the binary is produced in the `bin` folder.

### Step 5 — Run

Run the app from the extension. The REST trigger starts listening on port **9999** and the EMS trigger subscribes to `requesttopic`.

### Step 6 — Invoke the endpoint

```bash
curl "http://localhost:9999/request"
```

You should see the request published to `requesttopic`, the reply flow publish back to `replytopic`, and the correlated reply returned in the REST response. Log activities in both flows print progress to the VS Code terminal.

---

## App Properties Reference

| Property | Default | Description |
|---|---|---|
| `EMS.EMSmtlsfalse.ServerUrl` | `ssl://<host>:7223` | EMS server URL to connect to |
| `EMS.EMSmtlsfalse.User_Name` | `ENTER_YOUR_EMS_USER_NAME_HERE` | EMS user name |
| `EMS.EMSmtlsfalse.Password` | *(secret)* | EMS password |
| `EMS.EMSmtlsfalse.Client_ID` | *(empty)* | Optional EMS client ID |
| `EMS.EMSmtlsfalse.Enable_mTLS` | `false` | Enable mutual TLS (only when Authentication Mode is SSL) |
| `EMS.EMSmtlsfalse.CA_or_Server_Certificate` | *(cert)* | CA / server certificate (SSL mode) |
| `EMS.EMSmtlsfalse.Hostname_Verification` | `false` | Verify server hostname during SSL connection |
| `EMS.EMSmtlsfalse.Reconnect_Count` | `4` | Max reconnect attempts |
| `EMS.EMSmtlsfalse.Reconnect_Delay` | `500` | Delay (ms) between reconnect attempts |
| `EMS.EMSmtlsfalse.Retry_Timeout` | `0` | Max time (ms) to wait for reconnection |
| `Destination_Type` | `Topic` | Destination type for the request (`Topic` / `Queue`) |
| `Destination` | `requesttopic` | Request destination |
| `Reply_To_Destination` | `replytopic` | Reply destination |
| `Deliver_Delay` | `0` | Delivery delay for the request message |
| `Request_Timeout` | `0` | Request-reply timeout (`0` = wait indefinitely) |

> Update `ServerUrl`, `User_Name`, and `Password` to match your broker before running. The committed values are placeholders/environment-specific and must be replaced with your own.

---

## Troubleshooting

- **`Failed to create engine instance due to error: Not connected: EMS error`** — the EMS broker is not reachable. Confirm the broker is running and `ServerUrl`, credentials, and (for SSL) certificates are correct.
- **`fatal error: tibems/tibems.h: No such file or directory`** during build — the EMS HOME path (and system path) is not configured for the local runtime. Set EMS HOME in the Local Runtime settings and rebuild.
- **No reply / request hangs** — verify both triggers are running, that `Destination` (`requesttopic`) and `Reply_To_Destination` (`replytopic`) match on both flows, and that `Request_Timeout` is appropriate for your broker latency.

---

## About this migration

This sample was migrated from the Flogo **2.x** single-file app to the Flogo **3.x** folder-based project using the Flogo VS Code migration utility:

```bash
flogo-vscode-cli migrate-app -f Request_Reply_Topic_MessageProperties.flogo -o <output-dir>
```

The 2.x source lives at [`samples/VSCode_Extension/Connectors/Messaging/EMS/RequestReply`](../../../../VSCode_Extension/Connectors/Messaging/EMS/RequestReply). The migration converts the single `.flogo` JSON into modular resources (`app.fgmd`, `app.fgprops`, `flows/`, `triggers/`, `connections/`) with `flogoVersion` set to `3.0.0`.

---

## Help

For additional information, visit the [TIBCO Flogo® Extension for Visual Studio Code documentation](https://docs.tibco.com/products/tibco-flogo-extension-for-visual-studio-code-latest).
