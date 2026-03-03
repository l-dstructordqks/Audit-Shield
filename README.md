# 🔐 Audit-Shield

> Supply Chain Intelligence & Behavioral Network Analysis for Python Developers

Audit-Shield helps students and developers understand that software security has two inseparable dimensions: **what is in your code** and **what happens when that code runs**.

Most tools answer only the first question. Audit-Shield answers both.

[![Python](https://img.shields.io/badge/Python-3.11-blue)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## 🎯 What it does

| Module                              | Description                                                                                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **SCA — Dependency Scanner**        | Scans `requirements.txt` against [OSV.dev](https://osv.dev) (the official PyPA source) and flags CVEs, outdated packages, and maintenance risks |
| **Network Analyzer — Digital Twin** | Loads a traffic CSV and compares it against a statistical baseline to detect anomalies — no ML required                                         |
| **Audit Score**                     | Unified risk score `Score = (0.5×V) + (0.2×M) + (0.3×N)` with a GREEN / YELLOW / RED semaphore and actionable breakdown                         |
| **Educational Layer**               | Every alert explains _why_ it matters and _how_ to fix it — in plain language                                                                   |

---

## 🚀 Quick Start

### Backend

```bash
# Clone and set up
git clone https://github.com/your-username/audit-shield
cd audit-shield

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the API
uvicorn main:app --reload
# API available at http://localhost:8000
# Swagger UI at  http://localhost:8000/docs
```

### Frontend

```bash
cd dashboard
npm install
npm run dev
# Dashboard available at http://localhost:5173
```

### Try it with the example data

```bash
# Scan the example requirements.txt
curl -X POST http://localhost:8000/api/v1/scan/text \
  -H "Content-Type: application/json" \
  -d '{"content": "requests==2.25.0\ndjango==3.2.0\nnumpy==1.21.0"}'

# Generate and analyze example traffic
python examples/generate_traffic.py
curl -X POST http://localhost:8000/api/v1/network/analyze \
  -F "file=@dashboard/mock_data/traffic_sample.csv"
```

---

## 🧩 Architecture

```
audit-shield/
├── api/
│   ├── scanners/
│   │   ├── requirements_parser.py   # Parse requirements.txt
│   │   ├── osv_client.py            # CVE lookup via OSV.dev
│   │   ├── pypi_client.py           # Staleness via PyPI JSON API
│   │   └── net_analyzer.py          # Digital Twin analysis
│   ├── models/
│   │   └── scan.py                  # Pydantic schemas
│   ├── routes.py                    # SCA endpoints
│   └── routes_network.py            # Network endpoints
│
├── core_logic/
│   └── scoring.py                   # Audit Score formula
│
├── dashboard/                       # React + Vite
│   └── src/components/
│       ├── ScoreGauge.tsx
│       ├── DependencyTable.tsx
│       ├── RiskDistributionChart.tsx
│       ├── TrafficTwinChart.tsx
│       ├── EndpointSummary.tsx
│       └── EducationalTooltip.tsx
│
├── examples/
│   ├── requirements.txt             # Example project for analysis
│   └── generate_traffic.py          # Simulated traffic generator
│
└── docs/
    └── EDUCATIONAL.md               # Educational guide
```

---

## 📊 The Audit Score

```
Wv=0.5  Wm=0.2  Wn=0.3
Score = (Wv · V) + (Wm · M) + (Wn · N)
```

| Variable | Meaning                         | Weight |
| -------- | ------------------------------- | ------ |
| V        | Vulnerability impact (CVEs)     | 0.5    |
| M        | Maintenance (outdated packages) | 0.2    |
| N        | Network anomalies detected      | 0.3    |

A higher score means higher risk. The score maps to a semaphore:

```
0 ──────────── 40 ──────────── 70 ──────────── 100
│    GREEN     │    YELLOW     │      RED      │
│  Low risk    │  Moderate     │  High risk    │
```

---

## 📡 API Endpoints

| Method | Endpoint                  | Description                             |
| ------ | ------------------------- | --------------------------------------- |
| `POST` | `/api/v1/scan`            | Scan a `requirements.txt` file          |
| `POST` | `/api/v1/scan/text`       | Scan requirements from pasted text      |
| `POST` | `/api/v1/scan/full`       | Scan dependencies + traffic in one call |
| `POST` | `/api/v1/network/analyze` | Analyze a traffic CSV                   |

Full interactive documentation available at `/docs` (Swagger UI) when running locally.

---

## 🛡️ Safety Manifest

Audit-Shield was built on four principles:

- **Privacy** — analysis happens locally or via public APIs. Your source code is never uploaded
- **Transparency** — every alert links to its official source (NVD / Mitre / OSV)
- **Actionability** — every finding includes the exact command to fix it
- **Responsibility** — network patterns are signals of attention, never confirmed attack diagnoses

Read the full [Safety Manifest](docs/EDUCATIONAL.md#6-safety-manifest).

---

## 🎓 Educational Guide

New to supply chain security? The [Educational Guide](docs/EDUCATIONAL.md) covers:

- [What is supply chain security?](docs/EDUCATIONAL.md#1-what-is-supply-chain-security)
- [Why is PyPI critical for the Python ecosystem?](docs/EDUCATIONAL.md#2-why-is-pypi-critical-for-the-python-ecosystem)
- [What Audit-Shield does NOT do](docs/EDUCATIONAL.md#3-what-audit-shield-does-not-do)
- [How to interpret the results](docs/EDUCATIONAL.md#4-how-to-interpret-the-results)
- [Security ≠ Hacking](docs/EDUCATIONAL.md#5-security--hacking)

---

## 🧭 Tech Stack

| Layer    | Technology                         |
| -------- | ---------------------------------- |
| Backend  | Python 3.11, FastAPI, Pydantic     |
| Analysis | Pandas, NumPy, cvss                |
| Frontend | React + Vite, TypeScript, Recharts |
| CVE Data | OSV.dev API + PyPI JSON API        |
| Deploy   | "Is currently in development"      |

## "This feature is currently in development"

## 📄 License

MIT — see [LICENSE](LICENSE)

---

_Built for the Python community as part of a PSF grant application._  
_Audit-Shield is a defensive and educational tool — not a pentesting framework._
