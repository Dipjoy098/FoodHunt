from app.adapters.swiggy_adapter import SwiggyAdapter
from app.adapters.zomato_adapter import ZomatoAdapter

# Registry of all active platform adapters.
# To add a new platform (e.g. UberEats), just add it here.
ADAPTERS = [
    SwiggyAdapter(),
    ZomatoAdapter(),
    # UberEatsAdapter(),  # plug-and-play
]
