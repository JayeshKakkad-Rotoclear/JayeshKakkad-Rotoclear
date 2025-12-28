# Featured Projects - Maintenance Reference

This file provides extended project descriptions for easy updates to the main README.md.

---

## EdgeFleet
**Repository:** https://github.com/JayeshKakkad-Rotoclear/edgefleet  
**Status:** Concept/In Development  
**Category:** Flagship

### Description
Multi-tenant platform for managing industrial IoT devices with real-time telemetry, remote configuration, OTA updates (RAUC), and secure command execution.

### Key Features
- Secure device authentication (mTLS, JWT)
- Real-time telemetry streaming (MQTT, WebSocket)
- Remote configuration management
- OTA firmware updates via RAUC
- Command execution with audit logs
- Role-based access control (RBAC)
- Multi-tenancy with data isolation

### Tech Stack
FastAPI, PostgreSQL, SvelteKit, Docker, MQTT, RabbitMQ, RAUC, Nim (device agent)

### Security Considerations
- mTLS for device-to-cloud communication
- OAuth 2.0 for user authentication
- Encrypted credential storage (Vault)
- Row-level security in PostgreSQL
- Audit logs with tamper-proof checksums
- OWASP IoT Top 10 compliance

---

## Video Pipeline Lab
**Repository:** https://github.com/JayeshKakkad-Rotoclear/video-pipeline-lab  
**Status:** Concept  
**Category:** Educational

### Description
Educational platform for learning embedded video pipeline concepts. Interactive simulator demonstrating V4L2 abstractions, GStreamer pipeline construction, codec selection, and performance profiling—without requiring physical hardware.

### Key Features
- V4L2 device abstraction simulator
- GStreamer pipeline builder with drag-and-drop UI
- Codec comparison (H.264, H.265, VP9, AV1)
- Performance profiling dashboard
- Sandboxed execution environment

### Tech Stack
TypeScript, React, WebAssembly (future), FFmpeg, Python (backend simulator)

### Learning Objectives
- Understanding V4L2 kernel-space interactions
- GStreamer pipeline construction and debugging
- Codec selection trade-offs (size, quality, CPU)
- Performance profiling techniques

---

## SecureEdge
**Repository:** https://github.com/JayeshKakkad-Rotoclear/secure-edge  
**Status:** Concept  
**Category:** Security

### Description
Risk assessment and monitoring platform mapping OWASP IoT Top 10 vulnerabilities. Features device inventory, automated vulnerability scanning, and actionable remediation workflows for industrial IoT deployments.

### Key Features
- Device inventory with firmware version tracking
- OWASP IoT Top 10 risk scoring
- Automated vulnerability scanning (Nessus integration)
- Remediation workflow tracking
- Compliance reporting (IEC 62443, NIST Cybersecurity Framework)

### Tech Stack
FastAPI, PostgreSQL, SvelteKit, Nessus API, Docker

### Security Focus
- Weak/default credentials detection
- Insecure network services identification
- Outdated firmware detection
- Lack of secure update mechanism analysis
- Insufficient privacy protection checks

---

## FlowSync
**Repository:** https://github.com/JayeshKakkad-Rotoclear/flow-sync  
**Status:** Concept  
**Category:** Enterprise Integration

### Description
Visual workflow builder connecting Salesforce, Monday.com, PostgreSQL, and internal manufacturing systems. Enables non-technical users to create auditable, resilient automation workflows with RBAC, retry logic, and comprehensive audit trails.

### Key Features
- Visual workflow designer (node-based)
- Pre-built connectors (Salesforce, Monday.com, PostgreSQL, REST APIs)
- Conditional logic and data transformations
- Error handling with retry policies
- Audit logs with tamper-proof checksums
- RBAC for workflow management

### Tech Stack
React, PostgreSQL, RabbitMQ, Docker, Salesforce API, Monday.com API

### Business Value
- Reduce manual data entry errors
- Accelerate order-to-delivery cycle
- Provide real-time visibility into manufacturing processes
- Enable citizen developers to automate workflows

---

## System Design Studies
**Repository:** https://github.com/JayeshKakkad-Rotoclear/system-design-studies  
**Status:** Concept/Ongoing  
**Category:** Educational/Architecture

### Description
In-depth explorations of real-world system design challenges: API gateway patterns, rate limiting strategies, distributed tracing, observability architectures, and secure-by-design principles. Includes diagrams, code samples, and decision rationale.

### Topics Covered
- API gateway patterns (Kong, Envoy, custom)
- Rate limiting strategies (token bucket, leaky bucket, sliding window)
- Distributed tracing with OpenTelemetry
- Observability architectures (Prometheus, Grafana, Loki)
- Secure-by-design principles
- Database scaling strategies
- Event-driven architectures

### Format
Each case study includes:
- Problem statement and constraints
- Architecture diagrams (C4, sequence, deployment)
- Trade-off analysis
- Code samples
- Lessons learned

---

## Portfolio
**Repository:** https://github.com/JayeshKakkad-Rotoclear/portfolio  
**Status:** Active  
**Category:** Professional Showcase

### Description
Premium multi-page portfolio built with React, TypeScript, Material-UI, and Framer Motion. Showcases projects, technical writing, and professional background with a focus on performance, accessibility, and security best practices.

### Key Features
- Multi-page SPA with React Router
- Responsive design (mobile-first)
- Dark mode optimized
- Smooth animations with Framer Motion
- SEO-friendly
- Accessibility (WCAG compliant)
- Fast load times (lazy loading, code splitting)

### Tech Stack
React, TypeScript, Material-UI, Framer Motion, Vite

### Security Practices
- No sensitive data hardcoded
- Form validation with Zod
- External links with `rel="noopener noreferrer"`
- Content Security Policy headers
- Safe rendering (no `dangerouslySetInnerHTML`)

---

## Update Guidelines

When updating project descriptions in README.md:

1. Keep descriptions to 1-2 sentences in the main README
2. Maintain consistent formatting (tech stack tags after description)
3. Ensure all repository links are up-to-date
4. Update status labels if project state changes
5. Add demo links when available
6. Prioritize featured projects that best represent your skills

## Project Status Labels
- **Concept** - Planning/design phase
- **In Development** - Active implementation
- **Active** - Deployed and maintained
- **Archived** - Completed/no longer maintained
