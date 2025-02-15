from datetime import datetime
from typing import Annotated
from sqlalchemy import TIMESTAMP, Integer
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, declared_attr
from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine, AsyncSession
from app.config import database_url

engine = create_async_engine(url=database_url)
async_session_maker = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
str_uniq = Annotated[str, mapped_column(unique=True, nullable=False)]


class Base(AsyncAttrs, DeclarativeBase):
    __abstract__ = True

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), default=datetime.utcnow(),
                                                 onupdate=datetime.utcnow())
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        default=datetime.utcnow(),
        onupdate=datetime.utcnow()
    )

    @classmethod
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__}(id={self.id}, created_at={self.created_at}, updated_at={self.updated_at})>"
