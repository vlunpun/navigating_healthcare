# Quick Start Guide

## Your Application is Running! 🎉

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health

## How to Use the Application

### 1. Open the Application
Open your web browser and navigate to: **http://localhost:5173**

### 2. Navigate Through the Flow

**Step 1: Get Started Page**
- Click the "Get Started" button to begin

**Step 2: Authentication (Demo Mode)**
- Enter any email address (e.g., `test@example.com`)
- Click "Continue with Clear"
- This simulates the CLEAR authentication flow

**Step 3: Loading Screen**
- Automatically loads and simulates health record retrieval
- Shows progress indicators

**Step 4: Assessment Chat**
- Answer 10-15 questions about your health
- Questions cover:
  - Chronic conditions
  - Medications
  - Activities of Daily Living (ADLs)
  - Hospitalizations
  - Mobility and support needs

**Example Answers to Test:**
- "Do you have chronic conditions?" → `yes`
- "List your conditions:" → `diabetes, heart disease, COPD`
- "Do you have diabetes?" → `yes`
- "Do you need help with daily activities?" → `yes`
- "Which activities?" → `bathing, dressing, eating`
- "Have you been hospitalized?" → `yes`
- "How many times?" → `2`
- "Are you taking medications?" → `yes`
- "How many medications?" → `7`
- "Do you have mobility limitations?" → `yes`
- "Do you use assistive devices?" → `yes`
- "Do you have home health services?" → `yes`

**Step 5: Results Page**
- View your eligibility determination
- See confidence scores
- Read detailed explanations
- Download summary (placeholder)

**Step 6: Guidance Page**
- View next steps
- Access resources
- See contact information

## Testing Different Scenarios

### Scenario 1: Likely Eligible
Answer with significant health issues:
- Multiple chronic conditions (3+)
- Significant ADL limitations (3+)
- Multiple hospitalizations (2+)
- Many medications (7+)
- Uses assistive devices and home health

**Expected Result**: "Likely Eligible" with high confidence (80-95%)

### Scenario 2: Not Likely Eligible
Answer with fewer health issues:
- Few or no chronic conditions
- No ADL limitations
- No recent hospitalizations
- Few medications (<3)
- No assistive devices

**Expected Result**: "Not Likely Eligible" with moderate-high confidence

## How to Stop the Servers

### Option 1: Stop from Command Line
Press `Ctrl+C` in the terminal windows where the servers are running

### Option 2: Kill Processes
```bash
# Find and kill processes (Windows)
netstat -ano | findstr :5173
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

## Development Commands

### Start Everything
```bash
npm run dev
```

### Start Separately
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

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
npm start
```

## Testing the API Directly

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Evaluate Assessment
```bash
curl -X POST http://localhost:3000/api/assessment/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "hasChronicConditions": true,
    "chronicConditions": ["diabetes", "heart disease"],
    "hasDiabetes": true,
    "hasHeartDisease": true,
    "needsADLHelp": true,
    "adlLimitations": ["bathing", "dressing"],
    "hasHospitalizations": true,
    "hospitalizationCount": 2,
    "takingMedications": true,
    "medicationCount": 7,
    "hasMobilityLimitations": true,
    "usesAssistiveDevices": true,
    "hasHomeHealth": true
  }'
```

## Project Structure Overview

```
ENGS_90_Project/
├── frontend/           # React app (Port 5173)
│   ├── src/
│   │   ├── pages/     # All UI pages
│   │   └── components/ # Reusable UI components
│
├── backend/           # Express API (Port 3000)
│   ├── src/
│   │   ├── routes/    # API endpoints
│   │   └── services/  # Business logic
│
└── README.md          # Full documentation
```

## Key Features Implemented

✅ Mobile-first responsive design
✅ 7 complete pages with navigation
✅ Conversational assessment (10-15 questions)
✅ Hybrid eligibility engine (Rule-based + ML simulation)
✅ Confidence scoring (65-99%)
✅ Detailed explanations and recommendations
✅ PostgreSQL database schema (ready to connect)
✅ CLEAR API integration (ready to configure)
✅ Centauri API integration (ready to configure)
✅ Google Cloud deployment ready
✅ HIPAA compliance considerations

## Next Development Steps

1. **Connect Database**: Set up PostgreSQL and run schema migration
2. **Integrate CLEAR API**: Add real authentication with credentials
3. **Integrate Centauri**: Connect to health record system
4. **Deploy to GCP**: Set up Cloud Run, Cloud SQL, Vertex AI
5. **Add ML Model**: Replace simulated scoring with real Vertex AI

## Troubleshooting

### Port Already in Use
If you see "Port 5173 is already in use":
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <process_id> /F
```

### Dependencies Not Installed
```bash
npm run install:all
```

### Frontend Not Loading
Check if backend is running: http://localhost:3000/api/health

### API Errors
Check backend console output for error messages

## Support

Questions? Check the main README.md or contact the development team.

---

**Enjoy exploring the Centauri Medical Frailty Assessment Platform!** 🏥✨
