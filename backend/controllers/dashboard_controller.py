
from flask import jsonify
from models.user_model import get_db_connection
def get_dashboard_stats():
    connection = None
    cursor = None
    try:
        connection = get_db_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT COUNT(*) AS total
            FROM employees
        """)

        result = cursor.fetchone()

        total_employees = result["total"] or 0
        cursor.execute("""
            SELECT COUNT(*) AS total
            FROM employees
            WHERE LOWER(status) = 'active'
        """)

        result = cursor.fetchone()

        active_employees = result["total"] or 0
        cursor.execute("""
            SELECT COUNT(*) AS total
            FROM employees
            WHERE LOWER(status) = 'inactive'
        """)

        result = cursor.fetchone()

        inactive_employees = result["total"] or 0
        cursor.execute("""
            SELECT
                department,
                COUNT(*) AS employee_count
            FROM employees
            WHERE department IS NOT NULL
            AND department != ''
            GROUP BY department
            ORDER BY employee_count DESC
        """)

        department_data = cursor.fetchall()
        present_count = 0

        absent_count = 0

        late_count = 0

        leave_count = 0


        cursor.execute("""
            SELECT
                attendance_status,
                COUNT(*) AS total
            FROM attendance
            GROUP BY attendance_status
        """)


        attendance_data = cursor.fetchall()
        for row in attendance_data:

            status = str(

                row["attendance_status"]

            ).strip().lower()


            count = row["total"] or 0


            if status == "present":

                present_count = count


            elif status == "absent":

                absent_count = count


            elif status == "late":

                late_count = count


            elif status == "leave":

                leave_count = count
        return jsonify({

            "message":
                "Dashboard statistics retrieved successfully",

            "data": {

                "employees": {

                    "total":
                        total_employees,

                    "active":
                        active_employees,

                    "inactive":
                        inactive_employees

                },


                "departments":
                    department_data,


                "attendance": {

                    "present":
                        present_count,

                    "absent":
                        absent_count,

                    "late":
                        late_count,

                    "leave":
                        leave_count

                }

            }

        }), 200


    except Exception as error:

        print(

            "Dashboard Error:",

            error

        )


        return jsonify({

            "message":
                "Failed to load dashboard statistics",

            "error":
                str(error)

        }), 500


    finally:

        if cursor:

            cursor.close()


        if connection:

            connection.close()