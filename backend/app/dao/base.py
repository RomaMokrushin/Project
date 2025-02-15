from typing import List, TypeVar, Generic
from pydantic import BaseModel
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from sqlalchemy import update as sqlalchemy_update, delete as sqlalchemy_delete, func
from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession
from .database import Base
from app.exceptions import NotFound

OnlyBase = TypeVar("OnlyBase", bound=Base)


class BaseDAO(Generic[OnlyBase]):
    model: type[OnlyBase]

    @classmethod
    async def find_one_or_none_by_id(cls, data_id: int, session: AsyncSession):
        logger.info(f"Поиск {cls.model.__name__} с ID: {data_id}")
        try:
            query = select(cls.model).filter_by(id=data_id)
            result = await session.execute(query)
            record = result.scalar_one_or_none()
            if record:
                logger.info(f"Запись с ID {data_id} найдена.")
                return record
            else:
                logger.info(f"Запись с ID {data_id} не найдена.")
                raise NotFound
        except SQLAlchemyError as error:
            logger.error(f"Ошибка при поиске записи с ID {data_id}: {error}")
            raise

    @classmethod
    async def find_one_or_none(cls, session: AsyncSession, filters: BaseModel):
        filter_dict = filters.model_dump(exclude_unset=True)
        logger.info(f"Поиск одной записи {cls.model.__name__} по фильтрам: {filter_dict}")

        try:
            query = select(cls.model).filter_by(**filter_dict)
            result = await session.execute(query)
            record = result.scalar_one_or_none()

            if record:
                logger.info(f"Запись найдена по фильтрам: {filter_dict}")
            else:
                logger.info(f"Запись не найдена по фильтрам: {filter_dict}")
            return record
        except SQLAlchemyError as error:
            logger.error(f"Ошибка при поиске записи по фильтрам {filter_dict}: {error}")
            raise

    @classmethod
    async def find_all(cls, session: AsyncSession, filters: BaseModel or None):
        if filters:
            filter_dict = filters.model_dump(exclude_unset=True)
        else:
            filter_dict = {}
        logger.info(f"Поиск всех записей {cls.model.__name__} по фильтрам: {filter_dict}")
        try:
            query = select(cls.model).filter_by(**filter_dict)
            result = await session.execute(query)
            records = result.scalars().all()
            logger.info(f"Найдено {len(records)} записей.")
            return records
        except SQLAlchemyError as error:
            logger.error(f"Ошибка при поиске всех записей по фильтрам {filter_dict}: {error}")
            raise

    @classmethod
    async def add(cls, session: AsyncSession, values: BaseModel):
        values_dict = values.model_dump(exclude_unset=True)
        logger.info(f"Добавление записи {cls.model.__name__} с параметрами: {values_dict}")
        new_instance = cls.model(**values_dict)
        session.add(new_instance)
        try:
            await session.flush()
            logger.info(f"Запись {cls.model.__name__} успешно добавлена.")
        except SQLAlchemyError as error:
            await session.rollback()
            logger.error(f"Ошибка при добавлении записи: {error}")
            raise error
        return new_instance

    @classmethod
    async def update(cls, session: AsyncSession, filters: BaseModel, values: BaseModel):
        filter_dict = filters.model_dump(exclude_unset=True)
        values_dict = values.model_dump(exclude_unset=True)
        logger.info(f"Обновление записей {cls.model.__name__} по фильтру: {filter_dict} с параметрами: {values_dict}")
        query = (
            sqlalchemy_update(cls.model)
            .where(*[getattr(cls.model, key) == value for key, value in filter_dict.items()])
            .values(**values_dict)
            .execution_options(synchronize_session="fetch")
        )
        try:
            result = await session.execute(query)
            await session.flush()
            logger.info(f"Обновлено {result.rowcount} записей.")
            return result.rowcount
        except SQLAlchemyError as error:
            await session.rollback()
            logger.error(f"Ошибка при обновлении записей: {error}")
            raise error

    @classmethod
    async def delete(cls, session: AsyncSession, filters: BaseModel):
        filter_dict = filters.model_dump(exclude_unset=True)
        logger.info(f"Удаление записей {cls.model.__name__} по фильтру: {filter_dict}")
        if not filter_dict:
            logger.error("Нужен хотя бы один фильтр для удаления.")
            raise ValueError("Нужен хотя бы один фильтр для удаления.")

        query = sqlalchemy_delete(cls.model).filter_by(**filter_dict)
        try:
            result = await session.execute(query)
            await session.flush()
            logger.info(f"Удалено {result.rowcount} записей.")
            return result.rowcount
        except SQLAlchemyError as error:
            await session.rollback()
            logger.error(f"Ошибка при удалении записей: {error}")
            raise error

    @classmethod
    async def amount(cls, session: AsyncSession, filters: BaseModel):
        filter_dict = filters.model_dump(exclude_unset=True)
        logger.info(f"Подсчет количества записей {cls.model.__name__} по фильтру: {filter_dict}")
        try:
            query = select(func.count(cls.model.id)).filter_by(**filter_dict)
            result = await session.execute(query)
            count = result.scalar()
            logger.info(f"Найдено {count} записей.")
            return count
        except SQLAlchemyError as error:
            logger.error(f"Ошибка при подсчете записей: {error}")
            raise
