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
employee_bp = Blueprint(
    "employee",
    __name__,
    url_prefix="/api/employees"
)
employee_bp.route(
    "",
    methods=["GET"]
)(
    jwt_required()(
        get_employees
    )
)
employee_bp.route(
    "",
    methods=["POST"]
)(
    admin_required()(
        add_employee
    )
)
employee_bp.route(
    "/<int:employee_id>",
    methods=["GET"]
)(
    jwt_required()(
        get_employee
    )
)
employee_bp.route(
    "/<int:employee_id>",
    methods=["PUT"]
)(
    admin_required()(
        edit_employee
    )
)

employee_bp.route(
    "/<int:employee_id>",
    methods=["DELETE"]
)(
    admin_required()(
        remove_employee
    )
)