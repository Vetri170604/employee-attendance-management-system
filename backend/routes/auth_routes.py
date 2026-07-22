from flask import Blueprint

from controllers.auth_controller import (
    login
)


# =========================================
# CREATE BLUEPRINT
# =========================================

auth_bp = Blueprint(

    "auth",

    __name__,

    url_prefix="/api/auth"

)


# =========================================
# LOGIN
# =========================================

auth_bp.route(

    "/login",

    methods=["POST"]

)(login)