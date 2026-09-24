# Enterprise Agent Matrix & Governance Dashboard

A modern, high-performance web application designed to track and manage the complete lifecycle, version history, use cases, personas, and token/credit consumption of enterprise AI agents.

---

## ⚡ Quick Start

### 1. Install Dependencies & Run Locally
```bash
npm install
npm run dev
```

The application will launch locally at `http://localhost:5173/`.

### 2. Build Production Bundle
```bash
npm run build
npm run preview
```

---

## 🚀 How to Upload / Push to Git (GitHub / GitLab / Bitbucket)

If you downloaded the `.zip` archive or extracted the project folder, follow these steps to push it to your Git repository:

```bash
# 1. Navigate to the project root directory
cd enterprise-agent-dashboard

# 2. Initialize Git (if not already initialized)
git init

# 3. Add all project source files
git add .

# 4. Commit files
git commit -m "Initial commit: Enterprise Agent Lifecycle & Usage Dashboard"

# 5. Link your remote Git repository (Replace URL with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/enterprise-agent-dashboard.git

# 6. Set main branch and push code
git branch -M main
git push -u origin main
```

---

## 📋 Included Features & Requirements Met

- **Publish Date**: Exact release date for every enterprise agent.
- **Semantic Versioning**: Full version tracking (`v1.0.0` → `v2.8.0` → `v3.2.1`).
- **Revision Date**: Timestamp of the latest patch or metadata update.
- **Agent Use Case (Description)**: Operational problem statement and workflow target.
- **Agent Persona**: Persona specification, tone, and behavioral guidelines.
- **Business Line**: Department categorization (*Finance & Accounting*, *Global IT Services*, *Legal & Compliance*, *Human Resources*, *Customer Operations*, *Engineering & R&D*, *Supply Chain*, *Marketing*).
- **Token & Credit Usage**: Total tokens consumed, USD cost equivalent, and department budget cap progress bar.
- **Interactive Matrix & Grid View**: Filterable list with custom search, sort, and drawer details.
- **Interactive Sandbox Playground**: Test agent prompts live against persona responses.
- **Cost & Token Intelligence Analytics**: Recharts visual analytics for business line distribution, monthly run rate trends, and top cost drivers.
- **Governance & Compliance Policy**: Security guardrails and data classification levels (*Confidential*, *Internal*, *Public*).
