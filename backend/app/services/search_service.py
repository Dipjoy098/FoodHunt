"""
Search Service — core aggregation layer.

Flow:
    1. Fetch raw data from ALL platform adapters concurrently (location filter only)
    2. Normalize each adapter's results to standard schema
    3. Apply keyword filter (dish name contains query) ← filtering happens HERE, not in adapters
    4. Rank filtered results using RankingEngine
    5. Return ranked list + best_choice
"""

import asyncio

from app.adapters import ADAPTERS
from app.ranking.engine import RankingEngine


def keyword_match(query: str, dish_name: str) -> bool:
    """
    Returns True if dish_name contains the query keyword (case-insensitive).

    Examples:
        keyword_match("burger", "Whopper Burger")        → True
        keyword_match("burger", "McAloo Tikki Burger")   → True
        keyword_match("pizza",  "Chicken Pizza")         → True
        keyword_match("pizza",  "Chicken Biryani")       → False
    """
    return query.strip().lower() in dish_name.lower()


async def search(
    query: str,
    location: str,
    rating_weight: float = 0.7,
    price_weight: float = 0.3,
) -> dict:
    """
    Main search entry point.

    Args:
        query:          Keyword to search (e.g. "burger", "biryani")
        location:       City/area (e.g. "bangalore")
        rating_weight:  Weight for rating in ranking score (0–1)
        price_weight:   Weight for price in ranking score (0–1)

    Returns:
        {
            "results":     [...ranked dish results...],
            "best_choice": {...top result or None...},
            "total":       int,
            "query":       str,
            "location":    str,
            "message":     str or None,
        }
    """
    engine = RankingEngine(rating_weight=rating_weight, price_weight=price_weight)

    # Step 1 & 2: Fetch + normalize from all adapters concurrently
    async def fetch_adapter(adapter):
        raw = await adapter.fetch(location)
        return adapter.normalize(raw)

    results = await asyncio.gather(
        *[fetch_adapter(adapter) for adapter in ADAPTERS],
        return_exceptions=True,
    )

    # Flatten results, skip any adapter that raised an exception
    all_items = []
    for result in results:
        if isinstance(result, Exception):
            # Log and continue — graceful degradation
            print(f"[SearchService] Adapter error: {result}")
            continue
        all_items.extend(result)

    # Step 3: Keyword filter — happens in SearchService, NOT in adapters
    filtered = [item for item in all_items if keyword_match(query, item["dish_name"])]

    # Step 4: Rank
    ranked = engine.rank(filtered)

    # Step 5: Build response
    return {
        "results": ranked,
        "best_choice": ranked[0] if ranked else None,
        "total": len(ranked),
        "query": query,
        "location": location,
        "message": None if ranked else f'No dishes found matching "{query}" in {location}.',
    }
