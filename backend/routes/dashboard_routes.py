# from flask import Blueprint

# from flask_jwt_extended import jwt_required

# from controllers.dashboard_controller import (
#     dashboard_statistics
# )


# dashboard_bp = Blueprint(
#     "dashboard",
#     __name__,
#     url_prefix="/api/dashboard"
# )


# @dashboard_bp.route(
#     "/statistics",
#     methods=["GET"]
# )
# @jwt_required()
# def get_dashboard_statistics():

#     return dashboard_statistics()

from flask import Blueprint

from controllers.dashboard_controller import (
    get_dashboard_stats
)

from utils.auth import admin_required


dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/api/dashboard"
)


# =========================================
# DASHBOARD STATISTICS
# GET /api/dashboard/stats
# ADMIN ONLY
# =========================================

dashboard_bp.route(
    "/stats",
    methods=["GET"]
)(
    admin_required()(
        get_dashboard_stats
    )
)