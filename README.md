# Campaign Analytics Dashboard

A simplified marketing campaign analytics dashboard with Next.js frontend and FastAPI backend.

## Project Structure

```
campaign-analytics/
├── frontend/          # Next.js application
├── backend/           # FastAPI application
└── database/          # SQL scripts
```

## Tech Stack

- **Frontend**: Next.js 14, React 19, TailwindCSS
- **Backend**: FastAPI, Python, Pydantic
- **Database**: PostgreSQL/SQLite

## Features

- View all marketing campaigns in a table
- Filter campaigns by status (Active/Paused)
- Displays: Campaign Name, Status, Clicks, Cost, Impressions

---

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/Aaryan-Sharma-5/campaign-analytics.git
cd campaign-analytics
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

API will be available at: http://localhost:8000

### 3. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: http://localhost:3000

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API welcome message |
| GET | `/campaigns` | Returns all campaigns |
| GET | `/campaigns?status=Active` | Filter by Active status |
| GET | `/campaigns?status=Paused` | Filter by Paused status |

### Sample Response

```json
[
  {"id": 1, "name": "Summer Sale", "status": "Active", "clicks": 150, "cost": 45.99, "impressions": 1000},
  {"id": 2, "name": "Black Friday", "status": "Paused", "clicks": 320, "cost": 89.50, "impressions": 2500}
]
```

---

## Database Schema

```sql
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Active', 'Paused')),
    clicks INTEGER NOT NULL DEFAULT 0,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    impressions INTEGER NOT NULL DEFAULT 0
);
```

---

## Deployment

### Backend (Railway)

1. Go to [Railway](https://railway.app)
2. Create new project → Deploy from GitHub repo
3. Select the `backend` folder as root directory
4. Railway will auto-detect Python and deploy

### Frontend (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = Your Railway backend URL
5. Deploy

---

## Environment Variables

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, set this to your Railway backend URL.

---

## Author

Built by Aaryan
