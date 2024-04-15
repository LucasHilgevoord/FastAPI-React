# from database import Base
# from sqlalchemy import Column, Integer, String, Boolean, Float

# class Item(Base):
#     __tablename__ = 'items'
    
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     amount = Column(Float)
#     is_enabled = Column(Boolean)

from pydantic import BaseModel
from typing import List

class ItemBase(BaseModel):
    name: str
    amount: float
    is_enabled: bool

class ItemModel(ItemBase):
    id: int
    
    class Config:
        from_attributes = True

class Category(BaseModel):
    name: str
    icon: str
    options: List[List[str, bool]]