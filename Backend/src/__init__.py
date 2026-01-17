from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.db.main import init_db
from src.user.routes import user_router
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app:FastAPI):
    try:
        await init_db()
        print("Database connected") 
    except Exception as e:
        print("Database connection failed:", e)
        raise
    yield

version = "v1"

version_prefix = f"/api/{version}"


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",],         
    allow_credentials=True,        
    allow_methods=["*"],           
    allow_headers=["*"],           
)


app.include_router(user_router,prefix=f"{version_prefix}/user_data",tags=["user_data"])