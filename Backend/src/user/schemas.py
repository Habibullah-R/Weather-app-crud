from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class UserDataBase(BaseModel):
    city:str
    date:datetime
    temperature:float

class UserCreateModel(UserDataBase):
    pass

class UserReadModel(UserDataBase):
    uid:UUID
    created_at:datetime
    updated_at:datetime

class UserUpdateModel(UserDataBase):
    city:str
    date:datetime
    temperature:float
    
