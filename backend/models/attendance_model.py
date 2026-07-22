# import mysql.connector


# # =========================================================
# # DATABASE CONFIGURATION
# # =========================================================

# DB_CONFIG = {
#     "host": "localhost",
#     "user": "root", 
#     "password": "170604",
#     "database": "attendance_system"
# }


# # =========================================================
# # DATABASE CONNECTION
# # =========================================================

# def get_db_connection():

#     return mysql.connector.connect(
#         host=DB_CONFIG["host"],
#         user=DB_CONFIG["user"],
#         password=DB_CONFIG["password"],
#         database=DB_CONFIG["database"]
#     )


# # =========================================================
# # CREATE ATTENDANCE
# # POST /api/attendance
# # =========================================================

# def create_attendance(data):

#     connection = get_db_connection()
#     cursor = connection.cursor()

#     try:

#         query = """
#             INSERT INTO attendance
#             (
#                 employee_id,
#                 attendance_date,
#                 check_in_time,
#                 check_out_time,
#                 attendance_status
#             )
#             VALUES (%s, %s, %s, %s, %s)
#         """

#         values = (
#             data.get("employee_id"),
#             data.get("attendance_date"),
#             data.get("check_in_time") or None,
#             data.get("check_out_time") or None,
#             data.get("attendance_status", "Present")
#         )

#         cursor.execute(query, values)

#         connection.commit()

#         return cursor.lastrowid

#     except Exception as error:

#         connection.rollback()

#         print("CREATE ATTENDANCE ERROR:", error)

#         raise error

#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # GET ALL ATTENDANCE
# # GET /api/attendance
# # =========================================================

# def get_all_attendance():

#     connection = get_db_connection()

#     cursor = connection.cursor(dictionary=True)

#     try:

#         query = """
#             SELECT
#                 a.id,
#                 a.employee_id,

#                 e.employee_code,
#                 e.name AS employee_name,
#                 e.email,
#                 e.department,
#                 e.designation,

#                 a.attendance_date,
#                 a.check_in_time,
#                 a.check_out_time,
#                 a.attendance_status,

#                 a.created_at,
#                 a.updated_at

#             FROM attendance AS a

#             LEFT JOIN employees AS e
#                 ON a.employee_id = e.id

#             ORDER BY
#                 a.attendance_date DESC,
#                 a.id DESC
#         """

#         cursor.execute(query)

#         records = cursor.fetchall()

#         # Convert date/time objects to strings
#         for record in records:

#             if record["attendance_date"] is not None:
#                 record["attendance_date"] = str(
#                     record["attendance_date"]
#                 )

#             if record["check_in_time"] is not None:
#                 record["check_in_time"] = str(
#                     record["check_in_time"]
#                 )

#             if record["check_out_time"] is not None:
#                 record["check_out_time"] = str(
#                     record["check_out_time"]
#                 )

#             if record["created_at"] is not None:
#                 record["created_at"] = str(
#                     record["created_at"]
#                 )

#             if record["updated_at"] is not None:
#                 record["updated_at"] = str(
#                     record["updated_at"]
#                 )

#         return records

#     except Exception as error:

#         print("GET ALL ATTENDANCE ERROR:", error)

#         raise error

#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # GET ATTENDANCE BY EMPLOYEE
# # GET /api/attendance/employee/<employee_id>
# # =========================================================

# def get_employee_attendance(employee_id):

#     connection = get_db_connection()

#     cursor = connection.cursor(dictionary=True)

#     try:

#         query = """
#             SELECT
#                 a.id,
#                 a.employee_id,

#                 e.employee_code,
#                 e.name AS employee_name,
#                 e.email,
#                 e.department,
#                 e.designation,

#                 a.attendance_date,
#                 a.check_in_time,
#                 a.check_out_time,
#                 a.attendance_status,

#                 a.created_at,
#                 a.updated_at

#             FROM attendance AS a

#             LEFT JOIN employees AS e
#                 ON a.employee_id = e.id

#             WHERE a.employee_id = %s

#             ORDER BY
#                 a.attendance_date DESC,
#                 a.id DESC
#         """

#         cursor.execute(
#             query,
#             (employee_id,)
#         )

#         records = cursor.fetchall()

#         for record in records:

#             if record["attendance_date"] is not None:
#                 record["attendance_date"] = str(
#                     record["attendance_date"]
#                 )

#             if record["check_in_time"] is not None:
#                 record["check_in_time"] = str(
#                     record["check_in_time"]
#                 )

#             if record["check_out_time"] is not None:
#                 record["check_out_time"] = str(
#                     record["check_out_time"]
#                 )

#             if record["created_at"] is not None:
#                 record["created_at"] = str(
#                     record["created_at"]
#                 )

#             if record["updated_at"] is not None:
#                 record["updated_at"] = str(
#                     record["updated_at"]
#                 )

#         return records

#     except Exception as error:

#         print(
#             "GET EMPLOYEE ATTENDANCE ERROR:",
#             error
#         )

#         raise error

#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # GET ATTENDANCE SUMMARY
# # GET /api/attendance/summary
# # =========================================================

# def get_attendance_summary():

#     connection = get_db_connection()

#     cursor = connection.cursor(dictionary=True)

#     try:

#         query = """
#             SELECT

#                 COUNT(*) AS total_records,

#                 SUM(
#                     CASE
#                         WHEN attendance_status = 'Present'
#                         THEN 1
#                         ELSE 0
#                     END
#                 ) AS present_count,

#                 SUM(
#                     CASE
#                         WHEN attendance_status = 'Absent'
#                         THEN 1
#                         ELSE 0
#                     END
#                 ) AS absent_count,

#                 SUM(
#                     CASE
#                         WHEN attendance_status = 'Late'
#                         THEN 1
#                         ELSE 0
#                     END
#                 ) AS late_count,

#                 SUM(
#                     CASE
#                         WHEN attendance_status = 'Leave'
#                         THEN 1
#                         ELSE 0
#                     END
#                 ) AS leave_count

#             FROM attendance
#         """

#         cursor.execute(query)

#         result = cursor.fetchone()

#         if not result:

#             return {
#                 "total_records": 0,
#                 "present_count": 0,
#                 "absent_count": 0,
#                 "late_count": 0,
#                 "leave_count": 0
#             }

#         return {
#             "total_records": result.get("total_records") or 0,
#             "present_count": result.get("present_count") or 0,
#             "absent_count": result.get("absent_count") or 0,
#             "late_count": result.get("late_count") or 0,
#             "leave_count": result.get("leave_count") or 0
#         }

#     except Exception as error:

#         print(
#             "GET ATTENDANCE SUMMARY ERROR:",
#             error
#         )

#         raise error

#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # UPDATE ATTENDANCE
# # PUT /api/attendance/<id>
# # =========================================================

# def update_attendance(attendance_id, data):

#     connection = get_db_connection()

#     cursor = connection.cursor()

#     try:

#         query = """
#             UPDATE attendance

#             SET
#                 employee_id = %s,
#                 attendance_date = %s,
#                 check_in_time = %s,
#                 check_out_time = %s,
#                 attendance_status = %s

#             WHERE id = %s
#         """

#         values = (
#             data.get("employee_id"),
#             data.get("attendance_date"),
#             data.get("check_in_time") or None,
#             data.get("check_out_time") or None,
#             data.get("attendance_status", "Present"),
#             attendance_id
#         )

#         cursor.execute(
#             query,
#             values
#         )

#         connection.commit()

#         return cursor.rowcount

#     except Exception as error:

#         connection.rollback()

#         print(
#             "UPDATE ATTENDANCE ERROR:",
#             error
#         )

#         raise error

#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # DELETE ATTENDANCE
# # DELETE /api/attendance/<id>
# # =========================================================

# def delete_attendance(attendance_id):

#     connection = get_db_connection()

#     cursor = connection.cursor()

#     try:

#         query = """
#             DELETE FROM attendance
#             WHERE id = %s
#         """

#         cursor.execute(
#             query,
#             (attendance_id,)
#         )

#         connection.commit()

#         return cursor.rowcount

#     except Exception as error:

#         connection.rollback()

#         print(
#             "DELETE ATTENDANCE ERROR:",
#             error
#         )

#         raise error

#     finally:

#         cursor.close()
#         connection.close()

# import mysql.connector


# # =========================================================
# # DATABASE CONFIGURATION
# # =========================================================

# DB_CONFIG = {
#     "host": "localhost",
#     "user": "root",
#     "password": "170604",
#     "database": "attendance_management"
# }


# # =========================================================
# # DATABASE CONNECTION
# # =========================================================

# def get_db_connection():

#     return mysql.connector.connect(
#         host=DB_CONFIG["host"],
#         user=DB_CONFIG["user"],
#         password=DB_CONFIG["password"],
#         database=DB_CONFIG["database"]
#     )


# # =========================================================
# # CREATE ATTENDANCE
# # POST /api/attendance
# # =========================================================

# def create_attendance(data):

#     connection = get_db_connection()
#     cursor = connection.cursor()

#     try:

#         query = """
#             INSERT INTO attendance
#             (
#                 employee_id,
#                 attendance_date,
#                 check_in_time,
#                 check_out_time,
#                 attendance_status
#             )
#             VALUES (%s, %s, %s, %s, %s)
#         """

#         values = (
#             data.get("employee_id"),
#             data.get("attendance_date"),
#             data.get("check_in_time") or None,
#             data.get("check_out_time") or None,
#             data.get("attendance_status", "Present")
#         )

#         cursor.execute(query, values)

#         connection.commit()

#         return cursor.lastrowid

#     except Exception as error:

#         connection.rollback()

#         print(
#             "CREATE ATTENDANCE ERROR:",
#             error
#         )

#         raise error

#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # GET ALL ATTENDANCE
# # GET /api/attendance
# # =========================================================

# def get_all_attendance():

#     connection = get_db_connection()

#     cursor = connection.cursor(
#         dictionary=True
#     )

#     try:

#         query = """
#             SELECT
#                 a.id,
#                 a.employee_id,

#                 e.employee_code,
#                 e.name AS name,
#                 e.email,
#                 e.department,
#                 e.designation,

#                 a.attendance_date,
#                 a.check_in_time,
#                 a.check_out_time,
#                 a.attendance_status,

#                 a.created_at,
#                 a.updated_at

#             FROM attendance AS a

#             LEFT JOIN employees AS e
#                 ON a.employee_id = e.id

#             ORDER BY
#                 a.attendance_date DESC,
#                 a.id DESC
#         """

#         cursor.execute(query)

#         records = cursor.fetchall()


#         # =================================================
#         # CONVERT DATE / TIME TO STRING
#         # =================================================

#         for record in records:

#             if record["attendance_date"] is not None:

#                 record["attendance_date"] = str(
#                     record["attendance_date"]
#                 )


#             if record["check_in_time"] is not None:

#                 record["check_in_time"] = str(
#                     record["check_in_time"]
#                 )


#             if record["check_out_time"] is not None:

#                 record["check_out_time"] = str(
#                     record["check_out_time"]
#                 )


#             if record["created_at"] is not None:

#                 record["created_at"] = str(
#                     record["created_at"]
#                 )


#             if record["updated_at"] is not None:

#                 record["updated_at"] = str(
#                     record["updated_at"]
#                 )


#         return records


#     except Exception as error:

#         print(
#             "GET ALL ATTENDANCE ERROR:",
#             error
#         )

#         raise error


#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # GET ATTENDANCE BY EMPLOYEE
# # GET /api/attendance/employee/<employee_id>
# # =========================================================

# def get_employee_attendance(
#     employee_id
# ):

#     connection = get_db_connection()

#     cursor = connection.cursor(
#         dictionary=True
#     )

#     try:

#         query = """
#             SELECT
#                 a.id,
#                 a.employee_id,

#                 e.employee_code,
#                 e.name AS name,
#                 e.email,
#                 e.department,
#                 e.designation,

#                 a.attendance_date,
#                 a.check_in_time,
#                 a.check_out_time,
#                 a.attendance_status,

#                 a.created_at,
#                 a.updated_at

#             FROM attendance AS a

#             LEFT JOIN employees AS e
#                 ON a.employee_id = e.id

#             WHERE a.employee_id = %s

#             ORDER BY
#                 a.attendance_date DESC,
#                 a.id DESC
#         """

#         cursor.execute(
#             query,
#             (employee_id,)
#         )

#         records = cursor.fetchall()


#         # =================================================
#         # CONVERT DATE / TIME TO STRING
#         # =================================================

#         for record in records:

#             if record["attendance_date"] is not None:

#                 record["attendance_date"] = str(
#                     record["attendance_date"]
#                 )


#             if record["check_in_time"] is not None:

#                 record["check_in_time"] = str(
#                     record["check_in_time"]
#                 )


#             if record["check_out_time"] is not None:

#                 record["check_out_time"] = str(
#                     record["check_out_time"]
#                 )


#             if record["created_at"] is not None:

#                 record["created_at"] = str(
#                     record["created_at"]
#                 )


#             if record["updated_at"] is not None:

#                 record["updated_at"] = str(
#                     record["updated_at"]
#                 )


#         return records


#     except Exception as error:

#         print(
#             "GET EMPLOYEE ATTENDANCE ERROR:",
#             error
#         )

#         raise error


#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # GET ATTENDANCE SUMMARY
# # GET /api/attendance/summary
# # =========================================================

# def get_attendance_summary():

#     connection = get_db_connection()

#     cursor = connection.cursor(
#         dictionary=True
#     )

#     try:

#         query = """
#             SELECT

#                 COUNT(*) AS total_records,

#                 SUM(
#                     CASE
#                         WHEN attendance_status = 'Present'
#                         THEN 1
#                         ELSE 0
#                     END
#                 ) AS present_count,

#                 SUM(
#                     CASE
#                         WHEN attendance_status = 'Absent'
#                         THEN 1
#                         ELSE 0
#                     END
#                 ) AS absent_count,

#                 SUM(
#                     CASE
#                         WHEN attendance_status = 'Late'
#                         THEN 1
#                         ELSE 0
#                     END
#                 ) AS late_count,

#                 SUM(
#                     CASE
#                         WHEN attendance_status = 'Leave'
#                         THEN 1
#                         ELSE 0
#                     END
#                 ) AS leave_count

#             FROM attendance
#         """

#         cursor.execute(query)

#         result = cursor.fetchone()


#         if not result:

#             return {
#                 "total_records": 0,
#                 "present_count": 0,
#                 "absent_count": 0,
#                 "late_count": 0,
#                 "leave_count": 0
#             }


#         return {

#             "total_records":
#                 result.get(
#                     "total_records"
#                 ) or 0,

#             "present_count":
#                 result.get(
#                     "present_count"
#                 ) or 0,

#             "absent_count":
#                 result.get(
#                     "absent_count"
#                 ) or 0,

#             "late_count":
#                 result.get(
#                     "late_count"
#                 ) or 0,

#             "leave_count":
#                 result.get(
#                     "leave_count"
#                 ) or 0
#         }


#     except Exception as error:

#         print(
#             "GET ATTENDANCE SUMMARY ERROR:",
#             error
#         )

#         raise error


#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # UPDATE ATTENDANCE
# # PUT /api/attendance/<id>
# # =========================================================

# def update_attendance(
#     attendance_id,
#     data
# ):

#     connection = get_db_connection()

#     cursor = connection.cursor()

#     try:

#         # ================================================
#         # IMPORTANT:
#         # employee_id is NOT updated here.
#         #
#         # Because React edit form disables employee select.
#         # ================================================

#         query = """
#             UPDATE attendance

#             SET
#                 attendance_date = %s,
#                 check_in_time = %s,
#                 check_out_time = %s,
#                 attendance_status = %s

#             WHERE id = %s
#         """

#         values = (

#             data.get(
#                 "attendance_date"
#             ),

#             data.get(
#                 "check_in_time"
#             ) or None,

#             data.get(
#                 "check_out_time"
#             ) or None,

#             data.get(
#                 "attendance_status",
#                 "Present"
#             ),

#             attendance_id

#         )


#         cursor.execute(
#             query,
#             values
#         )


#         connection.commit()


#         return cursor.rowcount


#     except Exception as error:

#         connection.rollback()

#         print(
#             "UPDATE ATTENDANCE ERROR:",
#             error
#         )

#         raise error


#     finally:

#         cursor.close()
#         connection.close()


# # =========================================================
# # DELETE ATTENDANCE
# # DELETE /api/attendance/<id>
# # =========================================================

# def delete_attendance(
#     attendance_id
# ):

#     connection = get_db_connection()

#     cursor = connection.cursor()

#     try:

#         query = """
#             DELETE FROM attendance

#             WHERE id = %s
#         """


#         cursor.execute(

#             query,

#             (
#                 attendance_id,
#             )

#         )


#         connection.commit()


#         return cursor.rowcount


#     except Exception as error:

#         connection.rollback()

#         print(
#             "DELETE ATTENDANCE ERROR:",
#             error
#         )

#         raise error


#     finally:

#         cursor.close()
#         connection.close()



import mysql.connector



# =========================================================
# DATABASE CONFIGURATION
# =========================================================

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "170604",
    "database": "attendance_system"
}


# =========================================================
# DATABASE CONNECTION
# =========================================================

def get_db_connection():

    return mysql.connector.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        database=DB_CONFIG["database"]
    )


# =========================================================
# CREATE ATTENDANCE
# POST /api/attendance
# =========================================================

def create_attendance(data):

    connection = get_db_connection()
    cursor = connection.cursor()

    try:

        query = """
            INSERT INTO attendance
            (
                employee_id,
                attendance_date,
                check_in_time,
                check_out_time,
                attendance_status
            )
            VALUES (%s, %s, %s, %s, %s)
        """

        values = (
            data.get("employee_id"),
            data.get("attendance_date"),
            data.get("check_in_time") or None,
            data.get("check_out_time") or None,
            data.get("attendance_status", "Present")
        )

        cursor.execute(query, values)

        connection.commit()

        return cursor.lastrowid

    except Exception as error:

        connection.rollback()

        print(
            "CREATE ATTENDANCE ERROR:",
            error
        )

        raise error

    finally:

        cursor.close()
        connection.close()


# =========================================================
# GET ALL ATTENDANCE
# GET /api/attendance
# =========================================================

def get_all_attendance():

    connection = get_db_connection()

    cursor = connection.cursor(
        dictionary=True
    )

    try:

        query = """
            SELECT
                a.id,
                a.employee_id,

                e.employee_code,
                e.name AS name,
                e.email,
                e.department,
                e.designation,

                a.attendance_date,
                a.check_in_time,
                a.check_out_time,
                a.attendance_status,

                a.created_at,
                a.updated_at

            FROM attendance AS a

            LEFT JOIN employees AS e
                ON a.employee_id = e.id

            ORDER BY
                a.attendance_date DESC,
                a.id DESC
        """

        cursor.execute(query)

        records = cursor.fetchall()

        # Convert date/time objects to strings
        for record in records:

            if record["attendance_date"] is not None:

                record["attendance_date"] = str(
                    record["attendance_date"]
                )

            if record["check_in_time"] is not None:

                record["check_in_time"] = str(
                    record["check_in_time"]
                )

            if record["check_out_time"] is not None:

                record["check_out_time"] = str(
                    record["check_out_time"]
                )

            if record["created_at"] is not None:

                record["created_at"] = str(
                    record["created_at"]
                )

            if record["updated_at"] is not None:

                record["updated_at"] = str(
                    record["updated_at"]
                )

        return records

    except Exception as error:

        print(
            "GET ALL ATTENDANCE ERROR:",
            error
        )

        raise error

    finally:

        cursor.close()
        connection.close()


# =========================================================
# GET ATTENDANCE BY EMPLOYEE
# GET /api/attendance/employee/<employee_id>
# =========================================================

def get_employee_attendance(
    employee_id
):

    connection = get_db_connection()

    cursor = connection.cursor(
        dictionary=True
    )

    try:

        query = """
            SELECT
                a.id,
                a.employee_id,

                e.employee_code,
                e.name AS name,
                e.email,
                e.department,
                e.designation,

                a.attendance_date,
                a.check_in_time,
                a.check_out_time,
                a.attendance_status,

                a.created_at,
                a.updated_at

            FROM attendance AS a

            LEFT JOIN employees AS e
                ON a.employee_id = e.id

            WHERE a.employee_id = %s

            ORDER BY
                a.attendance_date DESC,
                a.id DESC
        """

        cursor.execute(
            query,
            (employee_id,)
        )

        records = cursor.fetchall()

        for record in records:

            if record["attendance_date"] is not None:

                record["attendance_date"] = str(
                    record["attendance_date"]
                )

            if record["check_in_time"] is not None:

                record["check_in_time"] = str(
                    record["check_in_time"]
                )

            if record["check_out_time"] is not None:

                record["check_out_time"] = str(
                    record["check_out_time"]
                )

            if record["created_at"] is not None:

                record["created_at"] = str(
                    record["created_at"]
                )

            if record["updated_at"] is not None:

                record["updated_at"] = str(
                    record["updated_at"]
                )

        return records

    except Exception as error:

        print(
            "GET EMPLOYEE ATTENDANCE ERROR:",
            error
        )

        raise error

    finally:

        cursor.close()
        connection.close()


# =========================================================
# GET ATTENDANCE SUMMARY
# GET /api/attendance/summary
# =========================================================

def get_attendance_summary():

    connection = get_db_connection()

    cursor = connection.cursor(
        dictionary=True
    )

    try:

        query = """
            SELECT

                COUNT(*) AS total_records,

                SUM(
                    CASE
                        WHEN attendance_status = 'Present'
                        THEN 1
                        ELSE 0
                    END
                ) AS present_count,

                SUM(
                    CASE
                        WHEN attendance_status = 'Absent'
                        THEN 1
                        ELSE 0
                    END
                ) AS absent_count,

                SUM(
                    CASE
                        WHEN attendance_status = 'Late'
                        THEN 1
                        ELSE 0
                    END
                ) AS late_count,

                SUM(
                    CASE
                        WHEN attendance_status = 'Leave'
                        THEN 1
                        ELSE 0
                    END
                ) AS leave_count

            FROM attendance
        """

        cursor.execute(query)

        result = cursor.fetchone()

        if not result:

            return {
                "total_records": 0,
                "present_count": 0,
                "absent_count": 0,
                "late_count": 0,
                "leave_count": 0
            }

        return {

            "total_records":
                result.get(
                    "total_records"
                ) or 0,

            "present_count":
                result.get(
                    "present_count"
                ) or 0,

            "absent_count":
                result.get(
                    "absent_count"
                ) or 0,

            "late_count":
                result.get(
                    "late_count"
                ) or 0,

            "leave_count":
                result.get(
                    "leave_count"
                ) or 0

        }

    except Exception as error:

        print(
            "GET ATTENDANCE SUMMARY ERROR:",
            error
        )

        raise error

    finally:

        cursor.close()
        connection.close()


# =========================================================
# UPDATE ATTENDANCE
# PUT /api/attendance/<id>
# =========================================================

def update_attendance(
    attendance_id,
    data
):

    connection = get_db_connection()

    cursor = connection.cursor()

    try:

        # Employee ID is NOT updated here.
        # Employee cannot be changed during edit.

        query = """
            UPDATE attendance

            SET
                attendance_date = %s,
                check_in_time = %s,
                check_out_time = %s,
                attendance_status = %s

            WHERE id = %s
        """

        values = (

            data.get(
                "attendance_date"
            ),

            data.get(
                "check_in_time"
            ) or None,

            data.get(
                "check_out_time"
            ) or None,

            data.get(
                "attendance_status",
                "Present"
            ),

            attendance_id

        )

        cursor.execute(
            query,
            values
        )

        connection.commit()

        return cursor.rowcount

    except Exception as error:

        connection.rollback()

        print(
            "UPDATE ATTENDANCE ERROR:",
            error
        )

        raise error

    finally:

        cursor.close()
        connection.close()


# =========================================================
# DELETE ATTENDANCE
# DELETE /api/attendance/<id>
# =========================================================

def delete_attendance(
    attendance_id
):

    connection = get_db_connection()

    cursor = connection.cursor()

    try:

        query = """
            DELETE FROM attendance

            WHERE id = %s
        """

        cursor.execute(
            query,
            (attendance_id,)
        )

        connection.commit()

        return cursor.rowcount

    except Exception as error:

        connection.rollback()

        print(
            "DELETE ATTENDANCE ERROR:",
            error
        )

        raise error

    finally:

        cursor.close()
        connection.close()