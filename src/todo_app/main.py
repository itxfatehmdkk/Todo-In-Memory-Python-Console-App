"""
Main entry point for the Todo CLI Application
"""

from .cli import TodoCLI


def main():
    """Main function to run the Todo CLI Application."""
    app = TodoCLI()
    app.run()


if __name__ == "__main__":
    main()