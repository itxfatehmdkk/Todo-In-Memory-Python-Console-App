"""Main application for the Todo Full-Stack Web Application."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.task_routes import router as task_router
from .api.auth_routes import router as auth_router
from .api.theme_router import router as theme_router
from .database import create_db_and_tables


app = FastAPI(
    title="Todo API",
    description="API for managing user tasks in the Todo Full-Stack Web Application",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://localhost:3002"],  # Allow frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the auth, task, and theme routes
app.include_router(auth_router)
app.include_router(task_router)
app.include_router(theme_router)


@app.on_event("startup")
def on_startup():
    """Create database tables on startup."""
    create_db_and_tables()


@app.get("/")
def read_root():
    """Root endpoint."""
    return {"message": "Welcome to the Todo API"}


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}