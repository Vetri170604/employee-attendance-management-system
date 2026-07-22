import os
from dotenv import load_dotenv
load_dotenv()

MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
MYSQL_DATABASE = os.getenv(
    "MYSQL_DATABASE",
    "attendance_system"
)

JWT_SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY",
    "your-secret-key"
)