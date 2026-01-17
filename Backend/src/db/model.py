from sqlmodel import SQLModel , Field , Column
import uuid
import sqlalchemy.dialects.postgresql as pg
from datetime import datetime

class UserData(SQLModel,table=True):
    __tablename__ = "user_data"
    
    uid : uuid.UUID = Field(
        sa_column=Column(pg.UUID,nullable=False,primary_key=True,default=uuid.uuid4,)
    )
    city:str
    date:datetime
    temperature:float
    created_at:datetime = Field(sa_column=Column(pg.TIMESTAMP,default=datetime.now,nullable=False))
    updated_at:datetime = Field(sa_column=Column(pg.TIMESTAMP,default=datetime.now,nullable=False,onupdate=datetime.now))
    
    def __repr__(self):
        return f"UserData {self.uid}"  