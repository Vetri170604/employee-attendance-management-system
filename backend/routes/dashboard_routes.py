
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
dashboard_bp.route(
    "/stats",
    methods=["GET"]
)(
    admin_required()(
        get_dashboard_stats
    )
)