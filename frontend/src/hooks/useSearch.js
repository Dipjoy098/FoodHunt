import { useState, useCallback } from "react";
import { searchDishes } from "../services/api";

/**
 * Custom hook encapsulating all search state and logic.
 * Keeps the App component clean.
 */
export function useSearch() {
  const [results, setResults] = useState([]);
  const [bestChoice, setBestChoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const [adapterStatus, setAdapterStatus] = useState({});

  const search = useCallback(async (query, location, rankingConfig) => {
    if (!query.trim() || !location.trim()) return;

    setLoading(true);
    setSearched(true);
    setError(null);
    setAdapterStatus({ Swiggy: "fetching...", Zomato: "fetching..." });

    // Simulate per-adapter live status indicators
    const t1 = setTimeout(() => setAdapterStatus((p) => ({ ...p, Swiggy: "✓" })), 400 + Math.random() * 400);
    const t2 = setTimeout(() => setAdapterStatus((p) => ({ ...p, Zomato: "✓" })), 300 + Math.random() * 600);

    try {
      const data = await searchDishes(query.trim(), location.trim().toLowerCase(), rankingConfig);
      setResults(data.results);
      setBestChoice(data.best_choice);
      if (data.total === 0) setError(`NO_MATCH:${query.trim()}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setAdapterStatus({ Swiggy: "✓", Zomato: "✓" });
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setResults([]);
    setBestChoice(null);
    setSearched(false);
    setError(null);
    setAdapterStatus({});
  };

  return { results, bestChoice, loading, searched, error, adapterStatus, search, reset };
}
