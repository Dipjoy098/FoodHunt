# 🍽️ FoodHunt

> Search and compare food dishes across **Swiggy** and **Zomato** simultaneously. Results are ranked by a configurable formula combining rating and price — best value always surfaces first.

---

## 📸 Features

- 🔍 **Keyword search** — type "burger", "biryani", "pizza" and get all matching dishes
- 🟠🔴 **Multi-platform aggregation** — Swiggy + Zomato fetched concurrently
- 🏆 **Smart ranking** — composite score: `70% rating + 30% price efficiency` (configurable)
- 🥇🥈🥉 **Medal rankings** with best choice highlighted
- 🎛️ **Filters** — max price, min rating, platform toggle
- ⚙️ **Ranking weights** — adjust rating vs price importance on the fly
- 🔗 **Direct order links** — "Order →" opens the real platform search page

---

## 🏗️ Architecture

```
foodhunt/
├── backend/                  # FastAPI Python backend
│   ├── app/
│   │   ├── main.py           # FastAPI app + routes
│   │   ├── adapters/
│   │   │   ├── base.py       # PlatformAdapter interface
│   │   │   ├── swiggy_adapter.py
│   │   │   ├── zomato_adapter.py
│   │   │   └── __init__.py   # ADAPTERS registry (plug-and-play)
│   │   ├── services/
│   │   │   └── search_service.py   # Aggregation + keyword filter + ranking
│   │   ├── ranking/
│   │   │   └── engine.py     # RankingEngine (configurable weights)
│   │   └── models/
│   │       ├── schemas.py    # Pydantic response models
│   │       └── mock_db.py    # Mock data (replace with real APIs)
│   ├── tests/
│   │   └── test_search.py    # Unit + integration tests
│   ├── requirements.txt
│   ├── Dockerfile
│   └── pytest.ini
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx           # Root component (orchestration only)
│   │   ├── main.jsx          # Entry point
│   │   ├── services/
│   │   │   └── api.js        # All backend API calls
│   │   ├── hooks/
│   │   │   └── useSearch.js  # Search state + logic hook
│   │   └── components/
│   │       ├── SearchBox.jsx
│   │       ├── ResultCard.jsx
│   │       ├── BestChoiceBanner.jsx
│   │       ├── FiltersPanel.jsx
│   │       ├── StarRating.jsx
│   │       └── PlatformBadge.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

### Search Data Flow

```
User types "burger"
       ↓
Frontend → GET /search?query=burger&location=bangalore
       ↓
SearchService
  ├── SwiggyAdapter.fetch(location)  ──┐
  └── ZomatoAdapter.fetch(location)  ──┤ (concurrent)
                                        ↓
                              Aggregate all results
                                        ↓
                        keyword_match("burger", dish_name)
                                        ↓
                            RankingEngine.rank(filtered)
                                        ↓
                    { results: [...], best_choice: {...} }
       ↓
Frontend renders ranked cards
```

---

## 🚀 Quick Start

### Option 1 — Run locally (recommended for development)

#### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn app.main:app --reload --port 8000
```

API is now running at **http://localhost:8000**

Try it: http://localhost:8000/search?query=burger&location=bangalore

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Start dev server
npm run dev
```

Frontend is now running at **http://localhost:5173**

---

### Option 2 — Docker Compose (full stack)

```bash
# From the project root
docker-compose up --build
```

- Frontend → http://localhost:5173
- Backend  → http://localhost:8000

---

## 🔌 API Reference

### `GET /search`

Search for dishes across all platforms.

| Parameter       | Type   | Default     | Description                              |
|----------------|--------|-------------|------------------------------------------|
| `query`         | string | required    | Keyword to search (e.g. `burger`)        |
| `location`      | string | `bangalore` | City or area                             |
| `rating_weight` | float  | `0.7`       | Weight for rating in score (0–1)         |
| `price_weight`  | float  | `0.3`       | Weight for price efficiency (0–1)        |

**Example request:**
```
GET /search?query=biryani&location=bangalore
```

**Example response:**
```json
{
  "results": [
    {
      "id": "zomato-behrouz-biryani-royal-chicken-dum-biryani",
      "dish_name": "Royal Chicken Dum Biryani",
      "restaurant": "Behrouz Biryani",
      "platform": "Zomato",
      "platform_color": "#E23744",
      "price": 349,
      "rating": 4.8,
      "delivery_time": "38-43 min",
      "location": "bangalore",
      "url": "https://www.zomato.com/bangalore/order-food-online?query=Royal+Chicken+Dum+Biryani",
      "image": "🫕",
      "score": 0.9823
    }
  ],
  "best_choice": { ... },
  "total": 8,
  "query": "biryani",
  "location": "bangalore",
  "message": null
}
```

### `GET /health`
Returns `{ "status": "healthy" }`

---

## 🧪 Running Tests

```bash
cd backend

# Install test dependencies (included in requirements.txt)
pip install pytest pytest-asyncio

# Run all tests
pytest

# Run with verbose output
pytest -v
```

Tests cover:
- `keyword_match()` — case insensitivity, partial matches, whitespace
- `RankingEngine` — scoring, sorting, edge cases, invalid weights
- `search()` — full integration: burger returns only burgers, empty results, best_choice

---

## ➕ Adding a New Platform (e.g. UberEats)

1. Create `backend/app/adapters/ubereats_adapter.py`:

```python
from app.adapters.base import PlatformAdapter

class UberEatsAdapter(PlatformAdapter):
    def __init__(self):
        super().__init__(name="UberEats", color="#06C167")

    async def fetch(self, location: str) -> list[dict]:
        # Call UberEats API here
        ...

    def normalize(self, raw_items: list[dict]) -> list[dict]:
        # Map to standard schema
        ...
```

2. Register it in `backend/app/adapters/__init__.py`:

```python
from app.adapters.ubereats_adapter import UberEatsAdapter

ADAPTERS = [
    SwiggyAdapter(),
    ZomatoAdapter(),
    UberEatsAdapter(),   # ← just add this line
]
```

That's it. No other changes needed. The search service, ranking, and frontend all work automatically.

---

## 🌐 Deployment

### Environment Variables

| Variable       | Location   | Description                    |
|----------------|------------|--------------------------------|
| `VITE_API_URL` | frontend   | Backend URL for production     |

### Deploy to any cloud

The Docker setup is ready for AWS ECS, Google Cloud Run, Railway, Render, or Fly.io.

```bash
# Build production images
docker-compose build

# Push to registry and deploy
docker push your-registry/foodhunt-backend
docker push your-registry/foodhunt-frontend
```

---

## 🛣️ Roadmap

- [ ] Connect to real Swiggy / Zomato APIs
- [ ] PostgreSQL: cache search results for 15 minutes
- [ ] Redis: rate limiting and cache layer
- [ ] Celery: background cache warmup jobs
- [ ] AI dish name matching using sentence embeddings
- [ ] Price trend analytics
- [ ] User accounts + saved searches

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/ubereats-adapter`
3. Commit changes: `git commit -m "Add UberEats adapter"`
4. Push and open a Pull Request

---

## 📄 License

MIT
# FoodHunt
