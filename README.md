# TaskSight

**Visual intelligence for physical operations.**

TaskSight is a Physical AI concept for mission-critical maintenance. It gives technicians real-time, step-by-step guidance, watches each physical action, catches mistakes before they become incidents, verifies completed work, and automatically creates a maintenance report.

The first vertical is data center maintenance.

## The problem

Data center technicians routinely replace components, inspect racks, connect cables, identify ports, check LEDs, follow shutdown procedures, and document changes. They currently move between manuals, standard operating procedures, tickets, phones or laptops, memory, and senior technicians.

A single error—such as selecting the wrong server, drive, cable, or port—can cause downtime and an expensive incident.

## The product

TaskSight brings operational context directly into the technician's view. Given a work order such as “Replace failed SSD in Rack B12, Server 08,” the system can:

1. Identify and confirm the correct rack.
2. Read the asset tag, server label, and rack position.
3. Present the next step through a visual or voice interface.
4. Observe the technician's action through a camera.
5. Verify the action and return a pass or warning.
6. Continue only when the required step is complete.
7. Produce a structured maintenance record with evidence.

The core loop is:

```text
AI sees → AI understands → AI recommends → Human acts → AI verifies → AI continues
```

TaskSight is not simply a manual displayed inside smart glasses. Its defining capability is verifying whether the physical instruction was performed correctly.

## Example workflow

```text
Work order
    ↓
Physical AI engine
    ↓
Technician camera / smart glasses
    ↓
Identify equipment → Guide action → Verify action
    ↓                      ↓
Detect mistakes      Capture evidence
    ↓                      ↓
Job complete → Automatic report → CMMS / ticketing / asset system
```

If a technician reaches for the wrong network cable, TaskSight can interrupt the action with a warning such as:

> Wrong network cable. Required port: NIC-2.

## Maintenance report

After a job, TaskSight can automatically record:

- technician, site, rack, and server;
- job type and start/end time;
- steps completed and warnings encountered;
- parts replaced and serial numbers;
- photo or video evidence;
- final verification and unresolved issues.

This reduces manual reporting time and creates a dependable audit trail for each physical asset.

## Why start with data centers?

- **High cost of errors:** preventing one incorrect action can create significant value.
- **Structured environments:** racks, ports, labels, and components are relatively standardized.
- **Repeatable procedures:** maintenance work is commonly governed by well-defined SOPs.
- **Evidence requirements:** operators need to know who performed each action, when, and whether procedure was followed.
- **Skilled labor:** better guidance and verification can materially improve technician productivity.

## MVP strategy

TaskSight should validate the intelligence layer before manufacturing custom glasses. An initial prototype can use a phone camera, body-mounted camera, or existing smart glasses.

A practical seven-day demo can use a mock server rack with printed rack, server, cable, and port labels. The system receives a cable-replacement task, verifies the correct rack, server, cable, port, and sequence, then generates a report such as:

```text
WORK ORDER #0072

Server: Rack A / Server 02
Task: Cable Replacement

✓ Correct asset identified
✓ Cable B removed
⚠ Initial attempt used incorrect port
✓ Correct port selected
✓ Cable C connected
✓ Final verification completed

Status: COMPLETE
```

## Future capabilities

- remote expert assistance using the technician's live view;
- AI troubleshooting grounded in manuals and incident history;
- real-time training for new technicians;
- safety and skipped-procedure warnings where technically reliable;
- a digital maintenance history for every physical asset;
- integrations with CMMS, ticketing, and asset-management systems.

After proving the model in data centers, the platform could expand to other structured maintenance environments such as telecom, industrial machinery, utilities, HVAC, manufacturing, and medical equipment service.

## Business model

The initial model is SaaS priced per technician, with enterprise or site contracts for integrations, deployment, support, and custom workflows. A supported hardware bundle may follow after the software and verification engine are proven.

## Positioning

> We build AI that verifies physical work.

TaskSight is best understood as a **Physical Work Intelligence Platform**, beginning with an AI copilot for data center technicians.

## Frontend

This repository contains the TaskSight concept landing page built with React, TypeScript, Vinext, Tailwind CSS, and the shadcn component library.

### Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## License

Licensed under the MIT License. Copyright © 2026 Prabhmannat Singh. See [LICENSE](./LICENSE).
