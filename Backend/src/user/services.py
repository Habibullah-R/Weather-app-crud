from sqlmodel import select , desc
from src.db.model import UserData
from sqlmodel.ext.asyncio.session import AsyncSession
from src.user.schemas import UserCreateModel , UserUpdateModel

class UserServices:
    async def get_data_by_id(self,uid:str,session:AsyncSession):
        statement = select(UserData).where(UserData.uid == uid)
        result = await session.exec(statement)
        data = result.first()
        return data if data is not None else None
    
    async def get_all_data(self,session:AsyncSession):
        statement = select(UserData).order_by(desc(UserData.created_at))
        result = await session.exec(statement)
        return result.all()
    
    async def create_user_data(self,user_data:UserCreateModel,session:AsyncSession):
        user_data_dict = user_data.model_dump()
        new_user_data = UserData(**user_data_dict)
        session.add(new_user_data)
        await session.commit()
        return new_user_data
    
    async def delete_user_data(self,uid:str,session:AsyncSession):
        data_to_delete = await self.get_data_by_id(uid,session)
        if data_to_delete is not None:
            await session.delete(data_to_delete)
            await session.commit()
            return {}
        else:
            return None
        
    async def update_user_data(self,data_uid:str,user_data:UserUpdateModel,session:AsyncSession):
        data_to_update = await self.get_data_by_id(data_uid,session)
        if data_to_update is not None:
            update_data_dict = user_data.model_dump()

            for k, v in update_data_dict.items():
                setattr(data_to_update, k, v)

            await session.commit()

            return data_to_update