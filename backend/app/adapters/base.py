"""
Base Platform Adapter Interface.
All platform adapters (Swiggy, Zomato, UberEats, etc.) must extend this class.
Adapters are responsible ONLY for fetching and normalizing raw platform data.
Filtering and ranking happen in the Search Service.
"""

from abc import ABC, abstractmethod


class PlatformAdapter(ABC):
    def __init__(self, name: str, color: str):
        self.name = name
        self.color = color

    @abstractmethod
    async def fetch(self, location: str) -> list[dict]:
        """Fetch all raw items for the given location from the platform."""
        pass

    @abstractmethod
    def normalize(self, raw_items: list[dict]) -> list[dict]:
        """Normalize raw platform data into the standard FoodHunt schema."""
        pass
