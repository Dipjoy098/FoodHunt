/**
 * API Service — all communication with the FoodHunt backend.
 * Change BASE_URL to point to your deployed backend.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Search for dishes across all platforms.
 * @param {string} query       - keyword (e.g. "burger")
 * @param {string} location    - city (e.g. "bangalore")
 * @param {object} rankConfig  - { ratingWeight, priceWeight }
 * @returns {Promise<SearchResponse>}
 */
export async function searchDishes(query, location, rankConfig = {}) {
  const { ratingWeight = 0.7, priceWeight = 0.3 } = rankConfig;

  const params = new URLSearchParams({
    query,
    location,
    rating_weight: ratingWeight,
    price_weight: priceWeight,
  });

  const res = await fetch(`${BASE_URL}/search?${params}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || `Request failed: ${res.status}`);
  }

  return res.json();
}
