from fastapi import APIRouter , Depends , status , HTTPException
from src.db.main import get_session
from .schemas import UserCreateModel , UserReadModel , UserUpdateModel
from sqlmodel.ext.asyncio.session import AsyncSession
from .services import UserServices
from typing import List


user_router = APIRouter()
user_service = UserServices()


@user_router.post("/data",response_model=UserReadModel,status_code=status.HTTP_201_CREATED)
async def post_data(user_data:UserCreateModel,session:AsyncSession=Depends(get_session)):
    user_data = await user_service.create_user_data(user_data,session)
    return user_data

@user_router.get("/data",response_model=List[UserReadModel],status_code=status.HTTP_200_OK)
async def get_all_data(session:AsyncSession=Depends(get_session)):
    data = await user_service.get_all_data(session)
    return data


@user_router.patch("/data/{data_uid}",response_model=UserReadModel,status_code=status.HTTP_200_OK)
async def update_data(data_uid:str,user_data:UserUpdateModel,session:AsyncSession=Depends(get_session)):
    data = await user_service.update_user_data(data_uid,user_data,session)
    return data

@user_router.delete("/data/{data_uid}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_data(data_uid:str,session:AsyncSession=Depends(get_session)):
    deleted = await user_service.delete_user_data(data_uid,session)
    if deleted is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Data with id {data_uid} not found"
        )
    return {}