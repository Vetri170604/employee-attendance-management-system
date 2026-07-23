import mysql.connector
from config import (
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
)
def get_db_connection():

    connection = mysql.connector.connect(
        host=MYSQL_HOST,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DATABASE
    )
    return connection
def get_user_by_username(username):

    connection = get_db_connection()

    cursor = connection.cursor(
        dictionary=True
    )

    query = """
        SELECT
            id,
            username,
            password_hash AS password,
            role
        FROM users
        WHERE username = %s
    """

    cursor.execute(
        query,
        (username,)
    )

    user = cursor.fetchone()

    cursor.close()

    connection.close()

    return user