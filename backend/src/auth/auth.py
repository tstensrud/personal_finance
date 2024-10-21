import json
from firebase_admin import auth
from flask import Blueprint, jsonify, request
from . import db_ops_auth as dbo

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()    
    if data:
        firstname = data["firstname"].strip()
        lastname = data["lastname"].strip()
        email = data["email"].strip()
        password = data["password"].strip()
        new_user = dbo.register_new_user(
            firstname=firstname,
            lastname=lastname,
            email=email,
            password=password,
        )

        if new_user:
            return jsonify({"success": True, "message": "User created"})
        return jsonify({"success": False, "message": "Could not create user"})
    return jsonify({"success": False, "message": "No new user data received"})


@auth_bp.route("/logout", methods=['GET'])
def logout():
    pass
