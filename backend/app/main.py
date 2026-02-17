"""
FoodHunt Backend — FastAPI Application
"""

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.services.search_service import search
from app.models.schemas import SearchResponse

app = FastAPI(
    title="FoodHunt API",
    description="Aggregates food listings from Swiggy & Zomato, ranks by rating + price.",
    version="1.0.0",
)

# Allow frontend dev server and production domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "ok", "message": "FoodHunt API is running 🍽️"}


@app.get("/search", response_model=SearchResponse)
async def search_dishes(
    query: str = Query(..., description="Food keyword to search (e.g. 'burger', 'biryani')"),
    location: str = Query("bangalore", description="City or area"),
    rating_weight: float = Query(0.7, ge=0, le=1, description="Weight for rating in ranking (0–1)"),
    price_weight: float = Query(0.3, ge=0, le=1, description="Weight for price in ranking (0–1)"),
):
    """
    Search for dishes across all platforms.

    - Fetches from Swiggy and Zomato concurrently
    - Filters by keyword match on dish name
    - Ranks by composite score: (rating_weight × rating) + (price_weight × price_efficiency)
    - Returns sorted results with best_choice highlighted

    Example:
        GET /search?query=burger&location=bangalore
    """
    if abs(rating_weight + price_weight - 1.0) > 0.01:
        raise HTTPException(
            status_code=400,
            detail="rating_weight + price_weight must equal 1.0",
        )

    result = await search(
        query=query.strip(),
        location=location.strip().lower(),
        rating_weight=rating_weight,
        price_weight=price_weight,
    )

    return SearchResponse(**result)


@app.get("/health")
def health():
    return {"status": "healthy"}
