import json
from firebase_admin import auth
from flask import Blueprint, jsonify, request
from functools import wraps
from . import db_ops_api as dbo

api_bp = Blueprint("api", __name__)

def firebase_auth_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.headers.get('Authorization')
        if id_token is None:
            return jsonify({"success": False, "message": "Credentials not valid"}), 401
        token = id_token.split(' ')[1]
        try:
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token
            uid = decoded_token['uid']
            request.user_uid = uid
        except Exception as e:
            return({"success": False, "message": str(e)}), 401
        return f(*args, **kwargs)
    return decorated_function

