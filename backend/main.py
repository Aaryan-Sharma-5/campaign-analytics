from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from pydantic import BaseModel

app = FastAPI(title="Campaign Analytics API")

# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Campaign model
class Campaign(BaseModel):
    id: int
    name: str
    status: str
    clicks: int
    cost: float
    impressions: int

# Mock data 
campaigns_data: List[Campaign] = [
    Campaign(id=1, name="Summer Sale", status="Active", clicks=150, cost=45.99, impressions=1000),
    Campaign(id=2, name="Black Friday", status="Paused", clicks=320, cost=89.50, impressions=2500),
    Campaign(id=3, name="Holiday Special", status="Active", clicks=275, cost=120.00, impressions=1800),
    Campaign(id=4, name="New Year Promo", status="Active", clicks=180, cost=55.25, impressions=1200),
    Campaign(id=5, name="Spring Collection", status="Paused", clicks=95, cost=30.00, impressions=600),
    Campaign(id=6, name="Flash Sale", status="Active", clicks=420, cost=150.75, impressions=3000),
    Campaign(id=7, name="Clearance Event", status="Paused", clicks=65, cost=22.50, impressions=450),
    Campaign(id=8, name="Back to School", status="Active", clicks=210, cost=78.00, impressions=1500),
    Campaign(id=9, name="Weekend Deals", status="Active", clicks=135, cost=42.00, impressions=900),
    Campaign(id=10, name="VIP Members Only", status="Paused", clicks=88, cost=35.00, impressions=550),
]

@app.get("/")
def root():
    return {"message": "Campaign Analytics API"}

@app.get("/campaigns", response_model=List[Campaign])
def get_campaigns(status: Optional[str] = Query(None, description="Filter by status: Active or Paused")):
    """
    Get all campaigns, optionally filtered by status.
    """
    if status:
        filtered = [c for c in campaigns_data if c.status.lower() == status.lower()]
        return filtered
    return campaigns_data
