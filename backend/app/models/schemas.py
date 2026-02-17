from pydantic import BaseModel
from typing import Optional


class DishResult(BaseModel):
    id: str
    dish_name: str
    restaurant: str
    platform: str
    platform_color: str
    price: float
    rating: float
    delivery_time: str
    location: str
    url: str
    image: str
    score: Optional[float] = None


class SearchResponse(BaseModel):
    results: list[DishResult]
    best_choice: Optional[DishResult] = None
    total: int
    query: str
    location: str
    message: Optional[str] = None
