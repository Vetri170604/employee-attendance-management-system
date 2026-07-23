from flask import request, jsonify

from models.employee_model import (
    create_employee,
    get_all_employees,
    get_employee_by_id,
    update_employee,
    delete_employee
)
def add_employee():

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "Request body is required"
        }), 400


    required_fields = [
        "employee_code",
        "name",
        "email"
    ]


    for field in required_fields:

        if not data.get(field):

            return jsonify({
                "message": f"{field} is required"
            }), 400


    try:

        employee_id = create_employee(data)

        return jsonify({

            "message":
                "Employee created successfully",

            "employee_id":
                employee_id

        }), 201


    except Exception as error:

        return jsonify({

            "message":
                "Failed to create employee",

            "error":
                str(error)

        }), 500
def get_employees():

    try:

        employees = get_all_employees()


        return jsonify({

            "message":
                "Employees retrieved successfully",

            "data":
                employees

        }), 200


    except Exception as error:

        return jsonify({

            "message":
                "Failed to retrieve employees",

            "error":
                str(error)

        }), 500
def get_employee(employee_id):

    try:

        employee = get_employee_by_id(
            employee_id
        )


        if not employee:

            return jsonify({

                "message":
                    "Employee not found"

            }), 404


        return jsonify({

            "message":
                "Employee retrieved successfully",

            "data":
                employee

        }), 200


    except Exception as error:

        return jsonify({

            "message":
                "Failed to retrieve employee",

            "error":
                str(error)

        }), 500
def edit_employee(employee_id):

    data = request.get_json()


    if not data:

        return jsonify({

            "message":
                "Request body is required"

        }), 400


    required_fields = [

        "employee_code",

        "name",

        "email"

    ]


    for field in required_fields:

        if not data.get(field):

            return jsonify({

                "message":
                    f"{field} is required"

            }), 400


    try:

        affected_rows = update_employee(

            employee_id,

            data

        )


        if affected_rows == 0:

            return jsonify({

                "message":
                    "Employee not found"

            }), 404


        return jsonify({

            "message":
                "Employee updated successfully"

        }), 200


    except Exception as error:

        return jsonify({

            "message":
                "Failed to update employee",

            "error":
                str(error)

        }), 500

def remove_employee(employee_id):

    try:

        affected_rows = delete_employee(

            employee_id

        )


        if affected_rows == 0:

            return jsonify({

                "message":
                    "Employee not found"

            }), 404


        return jsonify({

            "message":
                "Employee deleted successfully"

        }), 200


    except Exception as error:

        return jsonify({

            "message":
                "Failed to delete employee",

            "error":
                str(error)

        }), 500