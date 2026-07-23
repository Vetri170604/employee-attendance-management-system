from models.user_model import get_db_connection
def create_employee(data):
    connection = get_db_connection()
    cursor = connection.cursor()
    query = """
        INSERT INTO employees
        (
            employee_code,
            name,
            email,
            mobile,
            department,
            designation,
            status
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """


    values = (

        data.get("employee_code"),

        data.get("name"),

        data.get("email"),

        # Frontend "phone" -> Database "mobile"
        data.get("phone")
        or data.get("mobile"),

        data.get("department"),

        # Frontend "position" -> Database "designation"
        data.get("position")
        or data.get("designation"),

        data.get(
            "status",
            "Active"
        )
    )
    cursor.execute(

        query,

        values

    )
    connection.commit()
    employee_id = cursor.lastrowid
    cursor.close()
    connection.close()
    return employee_id

def get_all_employees():

    connection = get_db_connection()

    cursor = connection.cursor(

        dictionary=True

    )
    query = """
        SELECT
            id,
            employee_code,
            name,
            email,
            mobile AS phone,
            department,
            designation AS position,
            status
        FROM employees
        ORDER BY id DESC
    """
    cursor.execute(query)
    employees = cursor.fetchall()
    cursor.close()
    connection.close()
    return employees
def get_employee_by_id(employee_id):
    connection = get_db_connection()
    cursor = connection.cursor(
        dictionary=True
    )
    query = """
        SELECT
            id,
            employee_code,
            name,
            email,
            mobile AS phone,
            department,
            designation AS position,
            status
        FROM employees
        WHERE id = %s
    """
    cursor.execute(
        query,
        (employee_id,)
    )
    employee = cursor.fetchone()
    cursor.close()
    connection.close()
    return employee
def update_employee(
    employee_id,
    data
):
    connection = get_db_connection()
    cursor = connection.cursor()
    query = """
        UPDATE employees
        SET
            employee_code = %s,
            name = %s,
            email = %s,
            mobile = %s,
            department = %s,
            designation = %s,
            status = %s
        WHERE id = %s
    """
    values = (
        data.get("employee_code"),
        data.get("name"),
        data.get("email"),
        # Frontend "phone" -> Database "mobile"
        data.get("phone")
        or data.get("mobile"),
        data.get("department"),
        # Frontend "position" -> Database "designation"
        data.get("position")
        or data.get("designation"),
        data.get(
            "status",
            "Active"
        ),
        employee_id
    )
    cursor.execute(
        query,
        values
    )
    connection.commit()
    affected_rows = cursor.rowcount
    cursor.close()
    connection.close()
    return affected_rows
def delete_employee(employee_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    query = """
        DELETE FROM employees
        WHERE id = %s
    """
    cursor.execute(
        query,

        (employee_id,)
    )
    connection.commit()
    affected_rows = cursor.rowcount
    cursor.close()
    connection.close()
    return affected_rows