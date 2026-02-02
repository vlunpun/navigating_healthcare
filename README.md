# Centauri Medical Frailty Assessment Platform

A HIPAA-compliant web application that helps patients determine eligibility for medical frailty exemptions under Indiana Medicaid rules.

## Project Overview

This platform provides:
- **Secure Identity Verification** (CLEAR API integration ready)
- **Health Record Retrieval** (Centauri network integration ready)
- **AI-Powered Assessment** with 10-15 question conversational flow
- **Hybrid Eligibility Determination** (Rule-based + ML confidence scoring)
- **Mobile-First UI** designed for 6th-grade reading level

## Architecture

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: PostgreSQL (schema provided)
- **API Documentation**: RESTful JSON API
- **ML Integration**: Ready for Vertex AI (simulated for now)

### Google Cloud Infrastructure (Ready)
- Cloud Run for backend hosting
- Cloud SQL for PostgreSQL database
- Vertex AI for ML predictions
- Cloud Storage for documents
- IAM/KMS for security

## Project Structure

```
ENGS_90_Project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # UI components (Button, Card, Input, etc.)
│   │   ├── pages/           # Application pages
│   │   │   ├── GetStarted.tsx
│   │   │   ├── Auth.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── AssessmentChat.tsx
│   │   │   ├── StatusEligible.tsx
│   │   │   ├── StatusNotEligible.tsx
│   │   │   └── Guidance.tsx
│   │   ├── lib/             # Utility functions
│   │   └── App.tsx          # Main app with routing
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── database/        # Database schema
│   │   │   └── schema.sql
│   │   ├── routes/          # API routes
│   │   │   ├── health.ts    # Health check endpoints
│   │   │   └── assessment.ts # Assessment endpoints
│   │   ├── services/        # Business logic
│   │   │   └── eligibilityEngine.ts # Hybrid eligibility determination
│   │   └── index.ts         # Express server
│   ├── package.json
│   └── tsconfig.json
│
└── package.json             # Root package.json for monorepo

```

## Getting Started

### Prerequisites
- Node.js 18+ (with npm)
- PostgreSQL 14+ (optional for now - not required to run demo)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ENGS_90_Project
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```
   Or manually:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration (optional for demo)
   ```

### Running the Application

#### Development Mode (Both Frontend & Backend)

```bash
# From root directory
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

#### Run Separately

**Frontend only:**
```bash
cd frontend
npm run dev
```

**Backend only:**
```bash
cd backend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

## Features

### 1. User Flow

1. **Get Started** (`/get-started`)
   - Welcome page with overview
   - Clear call-to-action

2. **Authentication** (`/auth`)
   - CLEAR API integration placeholder
   - Secure identity verification flow
   - HIPAA-compliant

3. **Loading** (`/loading`)
   - Health records retrieval simulation
   - Centauri network integration ready

4. **Assessment** (`/assessment`)
   - Conversational chat interface
   - 10-15 questions covering:
     - Chronic conditions
     - Medications
     - Activities of Daily Living (ADLs)
     - Hospitalizations
     - Mobility limitations
     - Home health services

5. **Results** (`/status/eligible` or `/status/not-eligible`)
   - Clear eligibility determination
   - Confidence scores
   - Detailed explanation
   - Supporting factors

6. **Guidance** (`/guidance`)
   - Next steps
   - Contact information
   - Resources
   - Documentation checklist

### 2. Hybrid Eligibility Engine

The backend includes a sophisticated eligibility determination engine that combines:

**Rule-Based Scoring (60% weight):**
- Indiana Medicaid criteria implementation
- Deterministic scoring based on:
  - Chronic conditions (0-25 points)
  - ADL limitations (0-30 points)
  - Healthcare utilization (0-20 points)
  - Medications (0-15 points)
  - Mobility/support needs (0-10 points)

**ML Simulated Scoring (40% weight):**
- Feature engineering
- Weighted factors
- Confidence intervals
- Ready to swap with Vertex AI endpoint

**Confidence Calculation:**
- Agreement between methods
- Signal strength
- Range: 65-99%

### 3. Database Schema

Complete PostgreSQL schema provided in `backend/src/database/schema.sql`:
- Users (CLEAR integration)
- Assessment sessions
- Assessment responses
- Assessment results
- Medical conditions
- Functional limitations
- Health records metadata
- Audit logs (HIPAA compliance)

## API Endpoints

### Health Check
- `GET /api/health` - Basic health check
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/live` - Liveness probe

### Assessment
- `POST /api/assessment/evaluate` - Evaluate eligibility
  ```json
  {
    "hasChronicConditions": true,
    "chronicConditions": ["diabetes", "heart disease"],
    "needsADLHelp": true,
    "adlLimitations": ["bathing", "dressing"],
    ...
  }
  ```
- `GET /api/assessment/history/:userId` - Get assessment history (placeholder)

## Integration Points

### CLEAR API (Ready to integrate)
Located in: `frontend/src/pages/Auth.tsx`
- OAuth 2.0 / OIDC flow
- User verification
- PSUID storage
- Biographic matching

### Centauri Network (Ready to integrate)
Located in: `frontend/src/pages/Loading.tsx`
- Health record retrieval
- C-CDA document processing
- FHIR data normalization

### Vertex AI (Ready to integrate)
Located in: `backend/src/services/eligibilityEngine.ts`
- Replace `calculateMLSimulatedScore()` with actual API call
- Model endpoint configuration
- Feature vector preparation

## Next Steps

### 1. CLEAR API Integration
- [ ] Obtain CLEAR API credentials
- [ ] Configure OAuth redirect URLs
- [ ] Implement token exchange
- [ ] Add user matching logic

### 2. Centauri API Integration
- [ ] Obtain Centauri API credentials
- [ ] Implement health record retrieval
- [ ] Parse C-CDA documents
- [ ] Store in database

### 3. Database Setup
- [ ] Provision PostgreSQL instance
- [ ] Run schema migration
- [ ] Configure connection pooling
- [ ] Set up backups

### 4. ML Model Development
- [ ] Generate synthetic training data
- [ ] Train frailty classification model
- [ ] Deploy to Vertex AI
- [ ] Integrate RAG for policy retrieval

### 5. Google Cloud Deployment
- [ ] Create GCP project
- [ ] Configure Cloud Run
- [ ] Set up Cloud SQL
- [ ] Configure VPC Service Controls
- [ ] Set up CI/CD with Cloud Build

## Testing the Demo

1. Start both frontend and backend:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173 in your browser

3. Click "Get Started"

4. Enter any email (demo mode - no actual verification)

5. Complete the assessment chat by answering the questions

6. View your results with detailed explanation

7. Explore the guidance page for next steps

## Technology Stack Summary

| Component | Technology |
|-----------|------------|
| Frontend Framework | React 19 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| API Type | REST/JSON |
| Authentication | CLEAR OAuth (ready) |
| Health Data | Centauri API (ready) |
| ML/AI | Vertex AI (simulated) |
| Cloud Platform | Google Cloud |

## Security & Compliance

- **HIPAA Compliance**: Audit logging, encrypted storage ready
- **CLEAR Integration**: Identity verification with government ID
- **Data Encryption**: KMS configuration ready
- **Access Control**: IAM roles defined
- **Privacy**: GDPR/HIPAA data handling

## License

[Your License Here]

## Contributors

ENGS 90 Project Team

## Support

For questions or issues, please contact [your contact info]
