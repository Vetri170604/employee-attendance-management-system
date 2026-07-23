from flask import request, jsonify

from flask_jwt_extended import (
    create_access_token
)

from werkzeug.security import (
    check_password_hash
)

from models.user_model import (
    get_user_by_username
)
def login():

    data = request.get_json()
    if not data:

        return jsonify({

            "message":
            "Request body is required"

        }), 400


    username = data.get(
        "username"
    )

    password = data.get(
        "password"
    )
    if not username:

        return jsonify({

            "message":
            "Username is required"

        }), 400


    if not password:

        return jsonify({

            "message":
            "Password is required"

        }), 400
    try:
        user = get_user_by_username(

            username
        )
        if not user:

            return jsonify({

                "message":
                "Invalid username or password"

            }), 401
        password_is_valid = check_password_hash(

            user["password"],
            password
        )
        if not password_is_valid:

            return jsonify({

                "message":
                "Invalid username or password"

            }), 401
        access_token = create_access_token(

            identity=str(
                user["id"]
            ),

            additional_claims={

                "username":
                user["username"],

                "role":
                user["role"]

            }

        )
        return jsonify({

            "message":
            "Login successful",

            "access_token":
            access_token,

            "user": {

                "id":
                user["id"],

                "username":
                user["username"],

                "role":
                user["role"]

            }

        }), 200

    except Exception as error:

        return jsonify({

            "message":
            "Login failed",

            "error":
            str(error)

        }), 500