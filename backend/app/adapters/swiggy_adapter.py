"""
Swiggy Platform Adapter.
Fetches all items by location, then normalizes to standard schema.
In production: replace mock DB with real Swiggy API call.
"""

import asyncio
import random
from urllib.parse import quote

from app.adapters.base import PlatformAdapter
from app.models.mock_db import MOCK_DATABASE


class SwiggyAdapter(PlatformAdapter):
    def __init__(self):
        super().__init__(name="Swiggy", color="#FC8019")

    async def fetch(self, location: str) -> list[dict]:
        # Simulate network latency (remove in production)
        await asyncio.sleep(0.3 + random.random() * 0.4)

        # In production: call Swiggy API here
        # response = await http_client.get(f"https://api.swiggy.com/search?location={location}")
        loc = location.lower()
        return [item for item in MOCK_DATABASE["swiggy"] if loc in item["location"]]

    def normalize(self, raw_items: list[dict]) -> list[dict]:
        normalized = []
        for item in raw_items:
            normalized.append({
                "id": f"swiggy-{item['restaurant']}-{item['dish']}".replace(" ", "-").lower(),
                "dish_name": item["dish"],
                "restaurant": item["restaurant"],
                "platform": self.name,
                "platform_color": self.color,
                "price": item["price"],
                "rating": item["rating"],
                "delivery_time": item["delivery"],
                "location": item["location"],
                "url": f"https://www.swiggy.com/search?query={quote(item['dish'])}",
                "image": item["image"],
            })
        return normalized
