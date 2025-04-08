from functools import lru_cache

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv() # load environmental vars from .env file 


class Settings(BaseSettings):
    DATABASE_URL: str
    #SECRET_KEY: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


# Caches settings so it doesn't reload the environment variables every time.
@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()