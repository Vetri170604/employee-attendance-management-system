
from flask import Flask

from flask_cors import CORS

from flask_jwt_extended import JWTManager

from config import JWT_SECRET_KEY

from routes.auth_routes import auth_bp

from routes.employee_routes import employee_bp

from routes.attendance_routes import attendance_bp

from routes.dashboard_routes import dashboard_bp


# =========================================
# CREATE FLASK APPLICATION
# =========================================

app = Flask(__name__)


# =========================================
# CONFIGURATION
# =========================================

app.config[
    "JWT_SECRET_KEY"
] = JWT_SECRET_KEY


# =========================================
# EXTENSIONS
# =========================================

CORS(app)

jwt = JWTManager(app)


# =========================================
# REGISTER BLUEPRINTS
# =========================================

app.register_blueprint(
    auth_bp
)

app.register_blueprint(
    employee_bp
)

app.register_blueprint(
    attendance_bp
)

app.register_blueprint(
    dashboard_bp
)


# =========================================
# HOME / TEST API
# =========================================

@app.route("/")
def home():

    return {

        "message":
        "Attendance Management API is running"

    }


# =========================================
# RUN APPLICATION
# =========================================

if __name__ == "__main__":

    app.run(

        debug=True,

        port=5000

    )