# from flask import jsonify

# from models.dashboard_model import (
#     get_dashboard_statistics
# )


# # =========================================
# # DASHBOARD STATISTICS
# # =========================================

# def dashboard_statistics():

#     try:

#         statistics = (
#             get_dashboard_statistics()
#         )


#         return jsonify({

#             "message":
#                 "Dashboard statistics retrieved successfully",

#             "data":
#                 statistics

#         }), 200


#     except Exception as error:

#         return jsonify({

#             "message":
#                 "Failed to retrieve dashboard statistics",

#             "error":
#                 str(error)

#         }), 500


# from flask import jsonify

# from models.user_model import get_db_connection


# def get_dashboard_stats():

#     connection = None
#     cursor = None

#     try:

#         connection = get_db_connection()

#         cursor = connection.cursor(dictionary=True)

#         # =========================================
#         # TOTAL EMPLOYEES
#         # =========================================

#         cursor.execute("""
#             SELECT COUNT(*) AS total
#             FROM employees
#         """)

#         total_employees = cursor.fetchone()["total"]


#         # =========================================
#         # ACTIVE EMPLOYEES
#         # =========================================

#         cursor.execute("""
#             SELECT COUNT(*) AS total
#             FROM employees
#             WHERE LOWER(status) = 'active'
#         """)

#         active_employees = cursor.fetchone()["total"]


#         # =========================================
#         # INACTIVE EMPLOYEES
#         # =========================================

#         cursor.execute("""
#             SELECT COUNT(*) AS total
#             FROM employees
#             WHERE LOWER(status) = 'inactive'
#         """)

#         inactive_employees = cursor.fetchone()["total"]


#         # =========================================
#         # DEPARTMENT-WISE EMPLOYEES
#         # =========================================

#         cursor.execute("""
#             SELECT
#                 department,
#                 COUNT(*) AS employee_count
#             FROM employees
#             WHERE department IS NOT NULL
#             AND department != ''
#             GROUP BY department
#             ORDER BY employee_count DESC
#         """)

#         department_data = cursor.fetchall()


#         # =========================================
#         # ATTENDANCE SUMMARY
#         # =========================================

#         present_count = 0
#         absent_count = 0
#         late_count = 0
#         leave_count = 0


#         # Check if attendance table exists
#         try:

#             cursor.execute("""
#                 SELECT
#                     status,
#                     COUNT(*) AS total
#                 FROM attendance
#                 GROUP BY status
#             """)

#             attendance_data = cursor.fetchall()


#             for row in attendance_data:

#                 status = str(
#                     row["status"]
#                 ).lower()

#                 count = row["total"]


#                 if status == "present":

#                     present_count = count


#                 elif status == "absent":

#                     absent_count = count


#                 elif status == "late":

#                     late_count = count


#                 elif status == "leave":

#                     leave_count = count


#         except Exception:

#             # If attendance table
#             # does not exist yet

#             connection.rollback()

#             present_count = 0

#             absent_count = 0

#             late_count = 0

#             leave_count = 0


#         # =========================================
#         # RESPONSE
#         # =========================================

#         return jsonify({

#             "message":
#                 "Dashboard statistics retrieved successfully",

#             "data": {

#                 "employees": {

#                     "total":
#                         total_employees,

#                     "active":
#                         active_employees,

#                     "inactive":
#                         inactive_employees

#                 },


#                 "departments":
#                     department_data,


#                 "attendance": {

#                     "present":
#                         present_count,

#                     "absent":
#                         absent_count,

#                     "late":
#                         late_count,

#                     "leave":
#                         leave_count

#                 }

#             }

#         }), 200


#     except Exception as error:

#         print(
#             "Dashboard Error:",
#             error
#         )


#         return jsonify({

#             "message":
#                 "Failed to load dashboard statistics",

#             "error":
#                 str(error)

#         }), 500


#     finally:

#         if cursor:

#             cursor.close()


#         if connection:

#             connection.close()


from flask import jsonify

from models.user_model import get_db_connection


def get_dashboard_stats():

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(dictionary=True)


        # =========================================
        # TOTAL EMPLOYEES
        # =========================================

        cursor.execute("""
            SELECT COUNT(*) AS total
            FROM employees
        """)

        result = cursor.fetchone()

        total_employees = result["total"] or 0


        # =========================================
        # ACTIVE EMPLOYEES
        # =========================================

        cursor.execute("""
            SELECT COUNT(*) AS total
            FROM employees
            WHERE LOWER(status) = 'active'
        """)

        result = cursor.fetchone()

        active_employees = result["total"] or 0


        # =========================================
        # INACTIVE EMPLOYEES
        # =========================================

        cursor.execute("""
            SELECT COUNT(*) AS total
            FROM employees
            WHERE LOWER(status) = 'inactive'
        """)

        result = cursor.fetchone()

        inactive_employees = result["total"] or 0


        # =========================================
        # DEPARTMENT-WISE EMPLOYEES
        # =========================================

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


        # =========================================
        # ATTENDANCE SUMMARY
        # IMPORTANT:
        # Column name is attendance_status
        # NOT status
        # =========================================

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


        # =========================================
        # PROCESS ATTENDANCE COUNTS
        # =========================================

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


        # =========================================
        # RESPONSE
        # =========================================

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