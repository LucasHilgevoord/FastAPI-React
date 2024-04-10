from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class Item(Base):
    __tablename__ = 'items'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    amount = Column(Float)
    is_enabled = Column(Boolean)
    