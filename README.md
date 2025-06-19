# Topic Quiz Creator

A full-stack application for generating, taking, and grading topic-based quizzes using AI.

---

## Local Setup & Run Steps

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Python 3.10+
- MongoDB (local or cloud)

### 1. Clone the repository
```sh
git clone https://github.com/DavidN22/QuizGen.git
```

### 2. Install dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```
#### AI Service (Python)
```sh
cd ../ai-service
pip install -r requirements.txt
```

### 3. Environment Variables
- **Backend**: Create a `.env` file in `backend/` with at least:
  - `MONGODB_URI` — your MongoDB connection string
- **AI Service**: Create a `.env` file in `ai-service/` with at least:
  - `GEMINI_API_KEY` — your Gemini API key

### 4. Start all services
From the project root:
```sh
npm start
```
- This runs both backend (Express) and frontend (Vite) concurrently.
- Start the AI service separately:
```sh
cd ai-service
uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

---

## Deployment Instructions
- **Frontend**: Build with `npm run build` in `frontend/` and deploy the `dist/` folder to your static host (e.g., Vercel, Netlify).
- **Backend**: Build with `npm run build` in `backend/` and deploy the output (e.g., to Heroku, Render, or Vercel).
- **AI Service**: Deploy the FastAPI app (e.g., to AWS Lambda, Vercel, Azure Functions, or a VM with Uvicorn/Gunicorn).
- **MongoDB**: Use a managed service (MongoDB Atlas) or self-hosted instance.
- **This app was fully deployed on vercel and used vercel.json files for configuration**

---

## Architectural Trade-offs
- **Separation of Concerns**: AI service is decoupled from backend for flexibility and scaling, but requires managing CORS and multiple deployments.
- **Frontend/Backend Split**: Enables independent development and deployment, but adds complexity to local setup.
- **No Auth**: Simpler demo, but not secure for production use.

---

## Pseudo-Tests (Unit/Integration)

### Backend (Express)
- [ ] Should generate a quiz for a valid topic (mock AI service)
- [ ] Should return 400 for missing/invalid topic
- [ ] Should save generated quiz to MongoDB
- [ ] Should grade a quiz and return correct/incorrect answers
- [ ] Should handle DB/AI service errors gracefully

### AI Service (FastAPI)
- [ ] Should generate 5 questions for a given topic
- [ ] Each question should have 4 options and a correct answer
- [ ] Should validate input and return 400 for invalid requests

### Frontend (React)
- [ ] Should display quiz generation form and handle loading/errors
- [ ] Should render quiz questions and accept answers
- [ ] Should display results and feedback after grading
- [ ] Should reset state on new quiz

### Integration
- [ ] End-to-end: User generates, takes, and grades a quiz (mock AI/DB)
- [ ] API contract: Frontend and backend exchange correct data shapes


