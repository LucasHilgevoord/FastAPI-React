from database import Base
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
        
class FilterItem(BaseModel):
    name: str
    enabled: bool

class Filter(BaseModel):
    name: str
    icon: str
    options: List[FilterItem]
