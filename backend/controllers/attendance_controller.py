from flask import request, jsonify
from models.attendance_model import (
    create_attendance,
    get_all_attendance,
    get_employee_attendance,
    get_attendance_summary,
    update_attendance,
    delete_attendance
)
def add_attendance():

    data = request.get_json()
    if not data:
        return jsonify({
            "message":
            "Request body is required"
        }), 400
    required_fields = [
        "employee_id",
        "attendance_date"
    ]
    for field in required_fields:

        if not data.get(field):

            return jsonify({
                "message":
                f"{field} is required"
            }), 400
    try:

        attendance_id = create_attendance(
            data
        )
        return jsonify({

            "message":
            "Attendance marked successfully",

            "attendance_id":
            attendance_id

        }), 201
    except Exception as error:

        print(
            "Create Attendance Error:",
            error
        )

        return jsonify({

            "message":
            "Failed to mark attendance",

            "error":
            str(error)

        }), 500
def get_attendance():

    try:

        records = get_all_attendance()


        return jsonify({

            "message":
            "Attendance records retrieved successfully",

            "data":
            records

        }), 200


    except Exception as error:

        print(
            "Get Attendance Error:",
            error
        )

        return jsonify({

            "message":
            "Failed to retrieve attendance records",

            "error":
            str(error)

        }), 500
def get_employee_history(
    employee_id
):

    try:

        records = get_employee_attendance(
            employee_id
        )


        return jsonify({

            "message":
            "Employee attendance history retrieved successfully",

            "data":
            records

        }), 200


    except Exception as error:

        print(
            "Get Employee Attendance Error:",
            error
        )

        return jsonify({

            "message":
            "Failed to retrieve employee attendance history",

            "error":
            str(error)

        }), 500

def attendance_summary():

    try:

        summary = get_attendance_summary()


        return jsonify({

            "message":
            "Attendance summary retrieved successfully",

            "data":
            summary

        }), 200


    except Exception as error:

        print(
            "Get Attendance Summary Error:",
            error
        )

        return jsonify({

            "message":
            "Failed to retrieve attendance summary",

            "error":
            str(error)

        }), 500
def edit_attendance(
    attendance_id
):

    data = request.get_json()


    if not data:

        return jsonify({

            "message":
            "Request body is required"

        }), 400


    if not data.get(
        "attendance_date"
    ):

        return jsonify({

            "message":
            "attendance_date is required"

        }), 400


    try:

        affected_rows = update_attendance(

            attendance_id,

            data

        )


        if affected_rows == 0:

            return jsonify({

                "message":
                "Attendance record not found"

            }), 404


        return jsonify({

            "message":
            "Attendance updated successfully"

        }), 200


    except Exception as error:

        print(
            "Update Attendance Error:",
            error
        )

        return jsonify({

            "message":
            "Failed to update attendance",

            "error":
            str(error)

        }), 500
def remove_attendance(
    attendance_id
):

    try:

        affected_rows = delete_attendance(

            attendance_id

        )


        if affected_rows == 0:

            return jsonify({

                "message":
                "Attendance record not found"

            }), 404


        return jsonify({

            "message":
            "Attendance deleted successfully"

        }), 200


    except Exception as error:

        print(
            "Delete Attendance Error:",
            error
        )

        return jsonify({

            "message":
            "Failed to delete attendance",

            "error":
            str(error)

        }), 500