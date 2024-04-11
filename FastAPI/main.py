from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel

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

class ItemBase(BaseModel):
    name: str
    amount: float
    is_enabled: bool

class ItemModel(ItemBase):
    id: int
    
    class Config:
        from_attributes = True

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