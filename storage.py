import json
import os

FILE = "tickets.json"

def load_tickets():
    if not os.path.exists(FILE):
        return []
    with open(FILE, "r") as f:
        return json.load(f)
    
def save_tickets(tickets):
    with open(FILE, "w") as f:
        json.dump(tickets, f, indent=4)