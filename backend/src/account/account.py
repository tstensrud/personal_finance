from firebase_admin import auth
from flask import Blueprint, jsonify, request
from functools import wraps
from . import db_ops_account as dbo

account_bp = Blueprint("account", __name__)

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

@account_bp.route('/get/<uuid>/', methods=['GET'])
@firebase_auth_required
def get_account(uuid: str):
    user = dbo.get_user(uuid=uuid)
    if user:
        user_data = {}
        user_data['user_data'] = user.to_json()
        return jsonify({"success": True, "data": user_data})
    return jsonify({"success": False, "message": "User not found"})

@account_bp.route('/set_currency/<uuid>/', methods=['PATCH'])
@firebase_auth_required
def set_currency(uuid: str):
    data = request.get_json()
    if data:
        currency = data['currency']
        new_currency = dbo.set_currency(uuid=uuid, currency=currency)
        if new_currency:
            return jsonify({"success": True})
        return jsonify({"success": False, "message": "Could not change currency"})
    return jsonify({"success": False, "message": "No data received"})
