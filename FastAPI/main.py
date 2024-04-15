from fastapi import FastAPI, Depends, Query
from typing import List
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

import models
from models import ItemBase, ItemModel, Filter

app = FastAPI()

# Other applications may only call this FastAPI application it it comes from this origin
origins = [
    "http://localhost:3000",
]

filters = [
    {
        "name": "Type",
        "icon": "bi-cast",
        "options": [
            {"name": 'All', "enabled": True},
            {"name": 'Film', "enabled": False},
            {"name": 'Series', "enabled": False},
            {"name": 'Person', "enabled": False},
        ]
    },
    {
        "name": "Streaming Services",
        "icon": "bi-film",
        "options": [
            {"name": 'Netflix', "enabled": True},
            {"name": 'Disney+', "enabled": True},
            {"name": 'Amazon Prime', "enabled": True},
            {"name": 'HBOMax', "enabled": True},
        ]
    },
    {
        "name": "Regions",
        "icon": "bi-globe",
        "options": [
            {"name": 'EU', "enabled": True},
            {"name": 'US', "enabled": True},
            {"name": 'CA', "enabled": True},
        ]
    }
]

## Set the origin as the only allowed middleware
app.add_middleware( 
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=['*'],
    allow_headers=['*']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Add dependency injection
db_dependency = Depends(get_db)

# Create the database, the database will automaticly create the tables
models.Base.metadata.create_all(bind=engine)

# Endpoint for root
@app.get("/")
async def root():
    return ("Message", "Root")

# Endpoint for basic controls
@app.get("/control/send")
async def send_action(action: str):
    if action == "play":
        # Do Something
        return {"message": "Action 'play' executed"}
    elif action == "pause":
        # Do Something
        return {"message": "Action 'pause' executed"}
    elif action == "stop":
        # Do Something
        return {"message": "Action 'stop' executed"}
    else:
        return {"error": "Invalid action"}

# Endpoint for playback of deeplink
@app.get("/player/play/")
async def play(player_id: str, deeplink: str):
    # TODO: Get data from the correct place
    return {"player_id": player_id, "deeplink": deeplink}

# Endpoint for playback feedback
@app.get("/player/metadata/")
async def play(player_id: str):
    # TODO: Get data from the correct place
    return {"player_id": player_id, "status:": "Playing", "title:": "Breaking Bad"}

# Endpoint for filter options
@app.get("/filters/")
async def get_filters(db: Session = db_dependency) -> List[Filter]:
    # TODO: Retreive from database
    return [Filter(**filter) for filter in filters]