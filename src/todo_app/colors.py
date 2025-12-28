"""
Color and visual enhancement utilities for the Todo CLI Application
Provides Unicode icons and color-coded status indicators
"""

try:
    from colorama import init, Fore, Back, Style
    init()  # Initialize colorama for cross-platform color support
    COLORS_AVAILABLE = True
except ImportError:
    # If colorama is not available, use basic text without colors
    COLORS_AVAILABLE = False
    # Define fallback values
    class FallbackColors:
        RED = ''
        GREEN = ''
        YELLOW = ''
        BLUE = ''
        MAGENTA = ''
        CYAN = ''
        WHITE = ''
        RESET = ''

    class FallbackStyle:
        BRIGHT = ''
        DIM = ''
        RESET_ALL = ''

    # Create fallback objects
    Fore = FallbackColors()
    Style = FallbackStyle()


def get_status_icon(completed: bool) -> str:
    """
    Get the appropriate icon for task completion status.

    Args:
        completed (bool): Whether the task is completed

    Returns:
        str: Unicode icon for the status
    """
    return "✓" if completed else "○"


def get_status_color(completed: bool) -> str:
    """
    Get the appropriate color for task completion status.

    Args:
        completed (bool): Whether the task is completed

    Returns:
        str: Color code for the status
    """
    if not COLORS_AVAILABLE:
        return ""

    return Fore.GREEN if completed else Fore.RED


def get_operation_color(operation_type: str) -> str:
    """
    Get the appropriate color for different operation types.

    Args:
        operation_type (str): Type of operation ('success', 'error', 'pending', 'info')

    Returns:
        str: Color code for the operation type
    """
    if not COLORS_AVAILABLE:
        return ""

    color_map = {
        'success': Fore.GREEN,
        'error': Fore.RED,
        'pending': Fore.YELLOW,
        'info': Fore.CYAN,
        'warning': Fore.YELLOW,
        'normal': Fore.WHITE
    }

    return color_map.get(operation_type.lower(), Fore.WHITE)


def reset_color() -> str:
    """
    Get the color reset code.

    Returns:
        str: Color reset code
    """
    return Style.RESET_ALL if COLORS_AVAILABLE else ""


def colorize_text(text: str, color_type: str) -> str:
    """
    Colorize text based on the specified type.

    Args:
        text (str): Text to colorize
        color_type (str): Type of colorization ('success', 'error', 'pending', 'info', 'completed', 'incomplete')

    Returns:
        str: Colorized text
    """
    if color_type == 'completed':
        color = get_operation_color('success')
    elif color_type == 'incomplete':
        color = get_operation_color('error')
    else:
        color = get_operation_color(color_type)

    if not color:
        return text

    return f"{color}{text}{reset_color()}"


def format_task_display(task) -> str:
    """
    Format a task for display with visual indicators.

    Args:
        task: Task object to format

    Returns:
        str: Formatted task string with colors and icons
    """
    icon = get_status_icon(task.completed)
    color = get_status_color(task.completed)
    reset = reset_color()

    if COLORS_AVAILABLE:
        status = f"{color}{icon}{reset}"
        title = f"{color}{task.title}{reset}"
    else:
        # Without colors, just use the icon
        status = icon
        title = task.title

    return f"{status} {task.id}: {title}"


def print_colored_message(message: str, message_type: str = 'info'):
    """
    Print a message with appropriate coloring.

    Args:
        message (str): Message to print
        message_type (str): Type of message ('success', 'error', 'info', 'warning')
    """
    colored_msg = colorize_text(message, message_type)
    print(colored_msg)