from sqlmodel import Session, select
from typing import Optional
from ..models.theme import Theme, ThemeCreate, ThemeUpdate
from datetime import datetime


def get_user_theme(session: Session, user_id: str) -> Optional[Theme]:
    """Get theme preference for a specific user."""
    statement = select(Theme).where(Theme.user_id == user_id)
    return session.exec(statement).first()


def create_user_theme(session: Session, theme: ThemeCreate) -> Theme:
    """Create a new theme preference for a user."""
    # Check if theme already exists for this user
    existing_theme = get_user_theme(session, theme.user_id)
    if existing_theme:
        # Update existing theme
        return update_user_theme(session, existing_theme.id, ThemeUpdate(theme_mode=theme.theme_mode))

    # Create new theme
    db_theme = Theme.from_orm(theme) if hasattr(Theme, 'from_orm') else Theme.model_validate(theme)
    db_theme.updated_at = datetime.utcnow()
    session.add(db_theme)
    session.commit()
    session.refresh(db_theme)
    return db_theme


def update_user_theme(session: Session, theme_id: int, theme_update: ThemeUpdate) -> Optional[Theme]:
    """Update a user's theme preference."""
    db_theme = session.get(Theme, theme_id)
    if not db_theme:
        return None

    update_data = theme_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_theme, field, value)

    db_theme.updated_at = datetime.utcnow()
    session.add(db_theme)
    session.commit()
    session.refresh(db_theme)
    return db_theme


def delete_user_theme(session: Session, user_id: str) -> bool:
    """Delete a user's theme preference."""
    db_theme = get_user_theme(session, user_id)
    if not db_theme:
        return False

    session.delete(db_theme)
    session.commit()
    return True