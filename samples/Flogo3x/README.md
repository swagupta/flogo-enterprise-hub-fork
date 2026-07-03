# Flogo 3.x Samples

This folder holds TIBCO Flogo® **3.x** samples using the new **folder-based project format** (modular `app.fgmd`, `app.fgprops`, `flows/`, `triggers/`, `connections/`), as opposed to the single-file `.flogo` format used by the 2.x samples elsewhere in this repo.

Many of these samples are migrated from their 2.x counterparts using the Flogo VS Code migration utility (`flogo-vscode-cli migrate-app`). Migrating them here both provides ready-to-run 3.x samples and helps surface any issues in the older apps.

Each sample folder contains its own `README.md` with prerequisites and step-by-step run instructions (no screenshots — steps only, so they stay accurate over time).

## Samples

| Sample | Category | Description |
|---|---|---|
| [Connectors/Messaging/EMS/RequestReply](Connectors/Messaging/EMS/RequestReply) | EMS Messaging | Synchronous request-reply over EMS (topic) via REST trigger + EMS Request Reply / Receive / Send / Acknowledge |
