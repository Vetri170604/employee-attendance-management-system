from models.user_model import get_db_connection
def get_dashboard_statistics():
    connection = get_db_connection()
    cursor = connection.cursor(
        dictionary=True
    )
    try:
        cursor.execute("""
            SELECT COUNT(*) AS total_employees
            FROM employees
        """)

        total_employees = cursor.fetchone()
        cursor.execute("""
            SELECT COUNT(*) AS active_employees
            FROM employees
            WHERE status = 'Active'
        """)

        active_employees = cursor.fetchone()
        cursor.execute("""
            SELECT COUNT(*) AS present_today
            FROM attendance
            WHERE attendance_date = CURDATE()
            AND status = 'Present'
        """)

        present_today = cursor.fetchone()
        cursor.execute("""
            SELECT COUNT(*) AS absent_today
            FROM employees e

            LEFT JOIN attendance a

            ON e.id = a.employee_id

            AND a.attendance_date = CURDATE()

            WHERE e.status = 'Active'

            AND (
                a.id IS NULL
                OR a.status = 'Absent'
            )
        """)

        absent_today = cursor.fetchone()
        cursor.execute("""
            SELECT
                department,
                COUNT(*) AS employee_count

            FROM employees

            WHERE status = 'Active'

            GROUP BY department

            ORDER BY employee_count DESC
        """)

        department_count = cursor.fetchall()
        return {

            "total_employees":
                total_employees[
                    "total_employees"
                ],

            "active_employees":
                active_employees[
                    "active_employees"
                ],

            "present_today":
                present_today[
                    "present_today"
                ],

            "absent_today":
                absent_today[
                    "absent_today"
                ],

            "department_wise":
                department_count

        }
    finally:

        cursor.close()

        connection.close()