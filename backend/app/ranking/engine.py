"""
Ranking Engine.
Computes a composite score for each dish result and returns them sorted best → worst.

Score formula:
    normalized_rating = item.rating / max_rating_in_set
    normalized_price  = min_price_in_set / item.price
    score = (rating_weight * normalized_rating) + (price_weight * normalized_price)

Both weights are configurable and must sum to 1.0.
"""


class RankingEngine:
    def __init__(self, rating_weight: float = 0.7, price_weight: float = 0.3):
        if abs(rating_weight + price_weight - 1.0) > 0.001:
            raise ValueError("rating_weight + price_weight must equal 1.0")
        self.rating_weight = rating_weight
        self.price_weight = price_weight

    def _compute_score(self, item: dict, max_rating: float, min_price: float) -> float:
        normalized_rating = item["rating"] / (max_rating or 5)
        normalized_price = min_price / (item["price"] or 1)
        return (self.rating_weight * normalized_rating) + (self.price_weight * normalized_price)

    def rank(self, items: list[dict]) -> list[dict]:
        if not items:
            return []

        max_rating = max(i["rating"] for i in items)
        min_price = min(i["price"] for i in items)

        scored = [
            {**item, "score": round(self._compute_score(item, max_rating, min_price), 4)}
            for item in items
        ]

        return sorted(scored, key=lambda x: x["score"], reverse=True)
