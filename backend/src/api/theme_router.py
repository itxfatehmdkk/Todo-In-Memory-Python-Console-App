from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import Optional
from ..database import get_session
from ..models.theme import ThemeRead, ThemeCreate, ThemeUpdate
from ..services.theme_service import get_user_theme, create_user_theme, update_user_theme
from ..services.auth import get_current_user, TokenData


router = APIRouter(prefix="/api", tags=["theme"])


@router.get("/users/theme", response_model=ThemeRead)
async def get_theme(
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Get the current user's theme preference."""
    theme = get_user_theme(session, current_user.user_id)
    if not theme:
        # Create default theme if none exists
        theme_create = ThemeCreate(user_id=current_user.user_id, theme_mode="system")
        theme = create_user_theme(session, theme_create)

    return theme


@router.put("/users/theme", response_model=ThemeRead)
async def update_theme(
    theme_update: ThemeUpdate,
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Update the current user's theme preference."""
    # Get existing theme or create if it doesn't exist
    existing_theme = get_user_theme(session, current_user.user_id)

    if existing_theme:
        # Update existing theme
        updated_theme = update_user_theme(session, existing_theme.id, theme_update)
        if not updated_theme:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update theme preference"
            )
        return updated_theme
    else:
        # Create new theme if none exists
        if not theme_update.theme_mode:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="theme_mode is required for new theme preferences"
            )

        theme_create = ThemeCreate(
            user_id=current_user.user_id,
            theme_mode=theme_update.theme_mode
        )
        new_theme = create_user_theme(session, theme_create)
        return new_theme