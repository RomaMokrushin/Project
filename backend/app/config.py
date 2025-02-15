from os import path
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    BASE_DIR: str = path.abspath(path.join(path.dirname(__file__), ".."))
    DB_URL: str = f"sqlite+aiosqlite:///{BASE_DIR}/db/db.sqlite3"
    SECRET_KEY: str
    ALGORITHM: str
    EMAIL: str
    EMAIL_TOKEN: str
    BIN_INFO_API_TOKEN: str
    model_config = SettingsConfigDict(env_file=f"{BASE_DIR}/.env")


settings = Settings()
database_url = settings.DB_URL
