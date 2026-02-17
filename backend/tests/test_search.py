"""
Unit tests for the Search Service and Ranking Engine.
Run with: pytest backend/tests/
"""

import pytest
import asyncio
from app.services.search_service import keyword_match, search
from app.ranking.engine import RankingEngine


# ── keyword_match tests ──────────────────────────────────────

def test_keyword_match_exact():
    assert keyword_match("burger", "Whopper Burger") is True

def test_keyword_match_case_insensitive():
    assert keyword_match("BURGER", "Whopper Burger") is True
    assert keyword_match("Burger", "whopper burger") is True

def test_keyword_match_partial():
    assert keyword_match("biryani", "Chicken Biryani") is True
    assert keyword_match("chicken", "Chicken Biryani") is True
    assert keyword_match("pizza", "Chicken Pizza") is True

def test_keyword_match_no_match():
    assert keyword_match("burger", "Chicken Biryani") is False
    assert keyword_match("pizza", "Paneer Butter Masala") is False

def test_keyword_match_whitespace():
    assert keyword_match("  burger  ", "Whopper Burger") is True


# ── RankingEngine tests ──────────────────────────────────────

def test_ranking_engine_scores():
    engine = RankingEngine(rating_weight=0.7, price_weight=0.3)
    items = [
        {"dish_name": "A", "rating": 4.5, "price": 200, "restaurant": "R1", "platform": "Swiggy",
         "platform_color": "#FC8019", "delivery_time": "30 min", "location": "bangalore",
         "url": "http://x", "image": "🍗", "id": "1"},
        {"dish_name": "B", "rating": 4.0, "price": 150, "restaurant": "R2", "platform": "Zomato",
         "platform_color": "#E23744", "delivery_time": "25 min", "location": "bangalore",
         "url": "http://y", "image": "🍔", "id": "2"},
    ]
    ranked = engine.rank(items)
    # Higher rating item should rank first
    assert ranked[0]["dish_name"] == "A"

def test_ranking_engine_empty():
    engine = RankingEngine()
    assert engine.rank([]) == []

def test_ranking_engine_invalid_weights():
    with pytest.raises(ValueError):
        RankingEngine(rating_weight=0.6, price_weight=0.6)


# ── Integration: search service ──────────────────────────────

@pytest.mark.asyncio
async def test_search_burger_returns_burgers():
    result = await search("burger", "bangalore")
    assert result["total"] > 0
    for item in result["results"]:
        assert "burger" in item["dish_name"].lower()

@pytest.mark.asyncio
async def test_search_no_results():
    result = await search("sushi", "bangalore")
    assert result["total"] == 0
    assert result["best_choice"] is None
    assert result["message"] is not None

@pytest.mark.asyncio
async def test_search_best_choice_is_first():
    result = await search("biryani", "bangalore")
    if result["total"] > 0:
        assert result["best_choice"]["id"] == result["results"][0]["id"]
