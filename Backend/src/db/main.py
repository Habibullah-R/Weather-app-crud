from src.config import Config
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncEngine , create_async_engine 
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool


engine:AsyncEngine = create_async_engine(
    url = Config.DATABASE_URL,
    poolclass=NullPool,
    connect_args={
        "prepared_statement_cache_size": 0,  # Disable prepared statement cache
        "statement_cache_size": 0,  # Disable statement cache
    }
) 

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    
        
async def get_session()->AsyncSession:
    Session = sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False
    )
    
    async with Session() as session:
        yield session