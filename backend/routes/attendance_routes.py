# from flask import Blueprint

# from flask_jwt_extended import jwt_required
# from utils.auth_utils import admin_required

# from controllers.attendance_controller import (

#     mark_attendance,

#     get_attendance_records,

#     get_attendance_record,

#     edit_attendance,

#     remove_attendance,

#     employee_attendance_history,

#     attendance_summary

# )


# attendance_bp = Blueprint(

#     "attendance",

#     __name__,

#     url_prefix="/api/attendance"

# )


# # =========================================
# # MARK ATTENDANCE
# # POST /api/attendance
# # =========================================

# attendance_bp.route(
#     "",
#     methods=["POST"]
# )(
#     admin_required()(
#         mark_attendance
#     )
# )


# # =========================================
# # GET ALL ATTENDANCE
# # GET /api/attendance
# # =========================================

# attendance_bp.route(
#     "",
#     methods=["GET"]
# )(
#     jwt_required()(
#         get_attendance_records
#     )
# )


# # =========================================
# # ATTENDANCE SUMMARY
# # GET /api/attendance/summary
# # =========================================

# attendance_bp.route(
#     "/summary",
#     methods=["GET"]
# )(
#     jwt_required()(
#         attendance_summary
#     )
# )


# # =========================================
# # EMPLOYEE ATTENDANCE HISTORY
# # GET /api/attendance/employee/<id>
# # =========================================

# attendance_bp.route(
#     "/employee/<int:employee_id>",
#     methods=["GET"]
# )(
#     jwt_required()(
#         employee_attendance_history
#     )
# )


# # =========================================
# # GET ATTENDANCE BY ID
# # GET /api/attendance/<id>
# # =========================================

# attendance_bp.route(
#     "/<int:attendance_id>",
#     methods=["GET"]
# )(
#     jwt_required()(
#         get_attendance_record
#     )
# )


# # =========================================
# # UPDATE ATTENDANCE
# # PUT /api/attendance/<id>
# # =========================================

# attendance_bp.route(
#     "/<int:attendance_id>",
#     methods=["PUT"]
# )(
#     admin_required()(
#         edit_attendance
#     )
# )


# # =========================================
# # DELETE ATTENDANCE
# # DELETE /api/attendance/<id>
# # =========================================

# attendance_bp.route(
#     "/<int:attendance_id>",
#     methods=["DELETE"]
# )(
#     admin_required()(
#         remove_attendance
#     )
# )

# from flask import Blueprint

# from controllers.attendance_controller import (
#     add_attendance,
#     get_attendance,
#     get_employee_history,
#     attendance_summary,
#     edit_attendance,
#     remove_attendance
# )


# # =========================================
# # ATTENDANCE BLUEPRINT
# # =========================================

# attendance_bp = Blueprint(

#     "attendance",

#     __name__,

#     url_prefix="/api/attendance"

# )


# # =========================================
# # MARK ATTENDANCE
# # POST /api/attendance
# # =========================================

# attendance_bp.route(

#     "",

#     methods=["POST"]

# )(add_attendance)


# # =========================================
# # GET ALL ATTENDANCE
# # GET /api/attendance
# # =========================================

# attendance_bp.route(

#     "",

#     methods=["GET"]

# )(get_attendance)


# # =========================================
# # EMPLOYEE ATTENDANCE HISTORY
# # GET /api/attendance/employee/<employee_id>
# # =========================================

# attendance_bp.route(

#     "/employee/<int:employee_id>",

#     methods=["GET"]

# )(get_employee_history)


# # =========================================
# # ATTENDANCE SUMMARY
# # GET /api/attendance/summary
# # =========================================

# attendance_bp.route(

#     "/summary",

#     methods=["GET"]

# )(attendance_summary)


# # =========================================
# # UPDATE ATTENDANCE
# # PUT /api/attendance/<attendance_id>
# # =========================================

# attendance_bp.route(

#     "/<int:attendance_id>",

#     methods=["PUT"]

# )(edit_attendance)


# # =========================================
# # DELETE ATTENDANCE
# # DELETE /api/attendance/<attendance_id>
# # =========================================

# attendance_bp.route(

#     "/<int:attendance_id>",

#     methods=["DELETE"]

# )(remove_attendance)


from flask import Blueprint

from controllers.attendance_controller import (

    add_attendance,

    get_attendance,

    get_employee_history,

    attendance_summary,

    edit_attendance,

    remove_attendance

)


# =========================================
# ATTENDANCE BLUEPRINT
# =========================================

attendance_bp = Blueprint(

    "attendance",

    __name__,

    url_prefix="/api/attendance"

)


# =========================================
# CREATE / MARK ATTENDANCE
# POST /api/attendance
# =========================================

attendance_bp.route(

    "",

    methods=["POST"]

)(add_attendance)


# =========================================
# GET ALL ATTENDANCE
# GET /api/attendance
# =========================================

attendance_bp.route(

    "",

    methods=["GET"]

)(get_attendance)


# =========================================
# EMPLOYEE HISTORY
# GET /api/attendance/employee/<id>
# =========================================

attendance_bp.route(

    "/employee/<int:employee_id>",

    methods=["GET"]

)(get_employee_history)


# =========================================
# ATTENDANCE SUMMARY
# GET /api/attendance/summary
# =========================================

attendance_bp.route(

    "/summary",

    methods=["GET"]

)(attendance_summary)


# =========================================
# UPDATE ATTENDANCE
# PUT /api/attendance/<id>
# =========================================

attendance_bp.route(

    "/<int:attendance_id>",

    methods=["PUT"]

)(edit_attendance)


# =========================================
# DELETE ATTENDANCE
# DELETE /api/attendance/<id>
# =========================================

attendance_bp.route(

    "/<int:attendance_id>",

    methods=["DELETE"]

)(remove_attendance)