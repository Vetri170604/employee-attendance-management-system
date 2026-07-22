from functools import wraps

from flask import jsonify

from flask_jwt_extended import (
    verify_jwt_in_request,
    get_jwt
)


def admin_required():

    def decorator(function):

        @wraps(function)
        def wrapper(*args, **kwargs):

            # Check JWT
            verify_jwt_in_request()

            # Get JWT data
            claims = get_jwt()

            # Get role
            role = claims.get("role")

            # Check Admin role
            if role != "Admin":

                return jsonify({
                    "message": "Admin access required"
                }), 403

            return function(
                *args,
                **kwargs
            )

        return wrapper

    return decorator