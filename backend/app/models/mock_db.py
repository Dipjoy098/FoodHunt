"""
Mock database simulating data returned by Swiggy and Zomato APIs.
In production, replace these with real API calls or DB queries.
"""

MOCK_DATABASE = {
    "swiggy": [
        {"restaurant": "Paradise Biryani",  "dish": "Chicken Biryani",       "price": 249, "rating": 4.5, "delivery": "30-35 min", "image": "🍗", "location": "bangalore"},
        {"restaurant": "Behrouz Biryani",   "dish": "Chicken Dum Biryani",   "price": 329, "rating": 4.7, "delivery": "40-45 min", "image": "🫕", "location": "bangalore"},
        {"restaurant": "Biryani Blues",     "dish": "Hyderabadi Chicken Biryani", "price": 279, "rating": 4.3, "delivery": "25-30 min", "image": "🍛", "location": "bangalore"},
        {"restaurant": "Shah Ghouse",       "dish": "Chicken Biryani",       "price": 199, "rating": 4.2, "delivery": "35-40 min", "image": "🍗", "location": "bangalore"},
        {"restaurant": "Domino's Pizza",    "dish": "Margherita Pizza",      "price": 199, "rating": 4.1, "delivery": "20-25 min", "image": "🍕", "location": "bangalore"},
        {"restaurant": "Pizza Hut",         "dish": "Pepperoni Pizza",       "price": 349, "rating": 4.0, "delivery": "30-35 min", "image": "🍕", "location": "bangalore"},
        {"restaurant": "La Pino'z",         "dish": "Chicken Pizza",         "price": 259, "rating": 4.2, "delivery": "25-30 min", "image": "🍕", "location": "bangalore"},
        {"restaurant": "Moti Mahal",        "dish": "Paneer Butter Masala",  "price": 279, "rating": 4.4, "delivery": "30-35 min", "image": "🧀", "location": "bangalore"},
        {"restaurant": "Punjabi Dhaba",     "dish": "Paneer Butter Masala",  "price": 219, "rating": 4.1, "delivery": "20-25 min", "image": "🧀", "location": "bangalore"},
        {"restaurant": "Burger King",       "dish": "Whopper Burger",        "price": 189, "rating": 3.9, "delivery": "15-20 min", "image": "🍔", "location": "bangalore"},
        {"restaurant": "McDonald's",        "dish": "McAloo Tikki Burger",   "price": 89,  "rating": 3.8, "delivery": "15-20 min", "image": "🍔", "location": "bangalore"},
        {"restaurant": "Roll House",        "dish": "Chicken Roll",          "price": 149, "rating": 4.0, "delivery": "20-25 min", "image": "🌯", "location": "bangalore"},
    ],
    "zomato": [
        {"restaurant": "Paradise Biryani",  "dish": "Chicken Biryani",       "price": 259, "rating": 4.6, "delivery": "28-33 min", "image": "🍗", "location": "bangalore"},
        {"restaurant": "Behrouz Biryani",   "dish": "Royal Chicken Dum Biryani", "price": 349, "rating": 4.8, "delivery": "38-43 min", "image": "🫕", "location": "bangalore"},
        {"restaurant": "Dum Pukht",         "dish": "Chicken Biryani",       "price": 299, "rating": 4.5, "delivery": "45-50 min", "image": "🍛", "location": "bangalore"},
        {"restaurant": "Mughals Kitchen",   "dish": "Hyderabadi Biryani",    "price": 239, "rating": 4.3, "delivery": "30-35 min", "image": "🍗", "location": "bangalore"},
        {"restaurant": "Pizza Express",     "dish": "Margherita Pizza",      "price": 449, "rating": 4.5, "delivery": "25-30 min", "image": "🍕", "location": "bangalore"},
        {"restaurant": "Domino's Pizza",    "dish": "Farmhouse Pizza",       "price": 349, "rating": 4.2, "delivery": "18-22 min", "image": "🍕", "location": "bangalore"},
        {"restaurant": "Moti Mahal",        "dish": "Paneer Butter Masala",  "price": 289, "rating": 4.5, "delivery": "28-33 min", "image": "🧀", "location": "bangalore"},
        {"restaurant": "Chhappan Bhog",     "dish": "Paneer Makhani",        "price": 259, "rating": 4.6, "delivery": "35-40 min", "image": "🧀", "location": "bangalore"},
        {"restaurant": "Burger Singh",      "dish": "Big Sher Burger",       "price": 229, "rating": 4.2, "delivery": "20-25 min", "image": "🍔", "location": "bangalore"},
        {"restaurant": "McDonald's",        "dish": "Maharaja Mac",          "price": 149, "rating": 4.0, "delivery": "12-18 min", "image": "🍔", "location": "bangalore"},
        {"restaurant": "Kati Zone",         "dish": "Chicken Kati Roll",     "price": 169, "rating": 4.1, "delivery": "22-27 min", "image": "🌯", "location": "bangalore"},
        {"restaurant": "The Noodle Theory", "dish": "Chicken Noodles",       "price": 199, "rating": 4.3, "delivery": "25-30 min", "image": "🍜", "location": "bangalore"},
    ],
}
