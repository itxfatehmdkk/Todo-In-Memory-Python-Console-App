from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


class ThemeBase(SQLModel):
    user_id: str
    theme_mode: str = Field(regex=r'^(light|dark)$')  # Enum-like validation


class Theme(ThemeBase, table=True):
    __tablename__ = "themes"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)  # Removed foreign key constraint to match task model pattern
    theme_mode: str = Field(regex=r'^(light|dark)$')  # Enum-like validation
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ThemeCreate(ThemeBase):
    pass


class ThemeUpdate(SQLModel):
    theme_mode: Optional[str] = Field(default=None, regex=r'^(light|dark|system)$')
    updated_at: Optional[datetime] = None


class ThemeRead(ThemeBase):
    id: int
    updated_at: datetime