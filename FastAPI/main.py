from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session

from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Other applications may only call this FastAPI application it it comes from this origin
origins = [
    "http://localhost:3000",
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

@app.get("/")
async def root():
    return ("Message", "Root")

@app.post("/items/")
async def create_item(item: ItemBase, db: Session = db_dependency) -> ItemModel:
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/items/")
async def read_items(db: Session = db_dependency, index: int = 0, limit: int = 100) -> List[ItemModel]:
    items = db.query(models.Item).offset(index).limit(limit).all()
    return items

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
    
@app.get("/categories/")
async def get_categories(db: Session = db_dependency) -> List[Category]:
    # TODO: Retreive from database
    categories = [
        {
            "name": "Type",
            "icon": "bi-cast",
            "options": [['All', True], ['Film', False], ['Series', False], ['Person', False]]
        },
        {
            "name": "Streaming Services",
            "icon": "bi-film",
            "options": [['Netflix', True], ['Disney+', True], ['Amazon Prime', True], ['HBOMax', True]]
        },
        {
            "name": "Regions",
            "icon": "bi-globe",
            "options": [['EU', True], ['US', True], ['AU', False], ['CA', False]]
        }
    ]
    return [Category(**category) for category in categories]