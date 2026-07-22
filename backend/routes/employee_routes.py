from flask import Blueprint

from flask_jwt_extended import jwt_required

from utils.auth_utils import admin_required

from controllers.employee_controller import (
    add_employee,
    get_employees,
    get_employee,
    edit_employee,
    remove_employee
)


# =========================================
# CREATE BLUEPRINT
# =========================================

employee_bp = Blueprint(
    "employee",
    __name__,
    url_prefix="/api/employees"
)


# =========================================
# GET ALL EMPLOYEES
# GET /api/employees
# LOGGED-IN USERS
# =========================================

employee_bp.route(
    "",
    methods=["GET"]
)(
    jwt_required()(
        get_employees
    )
)


# =========================================
# ADD EMPLOYEE
# POST /api/employees
# ADMIN ONLY
# =========================================

employee_bp.route(
    "",
    methods=["POST"]
)(
    admin_required()(
        add_employee
    )
)


# =========================================
# GET EMPLOYEE BY ID
# GET /api/employees/<id>
# LOGGED-IN USERS
# =========================================

employee_bp.route(
    "/<int:employee_id>",
    methods=["GET"]
)(
    jwt_required()(
        get_employee
    )
)


# =========================================
# UPDATE EMPLOYEE
# PUT /api/employees/<id>
# ADMIN ONLY
# =========================================

employee_bp.route(
    "/<int:employee_id>",
    methods=["PUT"]
)(
    admin_required()(
        edit_employee
    )
)


# =========================================
# DELETE EMPLOYEE
# DELETE /api/employees/<id>
# ADMIN ONLY
# =========================================

employee_bp.route(
    "/<int:employee_id>",
    methods=["DELETE"]
)(
    admin_required()(
        remove_employee
    )
)