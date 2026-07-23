from flask import Blueprint
from controllers.attendance_controller import (
    add_attendance,
    get_attendance,
    get_employee_history,
    attendance_summary,
    edit_attendance,
    remove_attendance
)
attendance_bp = Blueprint(
    "attendance",
    __name__,
    url_prefix="/api/attendance"
)

attendance_bp.route(
    "",
    methods=["POST"]

)(add_attendance)
attendance_bp.route(
    "",
    methods=["GET"]
)(get_attendance)
attendance_bp.route(
    "/employee/<int:employee_id>",
    methods=["GET"]
)(get_employee_history)
attendance_bp.route(
    "/summary",
    methods=["GET"]
)(attendance_summary)
attendance_bp.route(
    "/<int:attendance_id>",
    methods=["PUT"]
)(edit_attendance)
attendance_bp.route(
    "/<int:attendance_id>",
    methods=["DELETE"]
)(remove_attendance)