import json
from firebase_admin import auth
from flask import Blueprint, jsonify, request
from functools import wraps
from . import db_ops_api as dbo
from .globals import is_int

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

##########################
# SPENDING PLAN / BUDGET #
##########################
@api_bp.route('/spending_plan/<uuid>/', methods=['GET'])
@firebase_auth_required
def get_spending_plan(uuid):
    user = dbo.get_user(uuid=uuid)
    if user:
        spending_plan_expenses = dbo.get_user_spending_plan_expenses(uuid=uuid)
        spending_plan_income = dbo.get_user_spending_plan_income(uuid=uuid)
        
        data = {}
        expenses_data = {}
        income_data = {}
        
        # Extract income
        for post, category in spending_plan_income:
            post_data = {}
            post_data["post_data"] = post.to_json()
            post_data["category_data"] = category.to_json()
            income_data[post.uid] = post_data

        # Extract expenses
        for post, category in spending_plan_expenses:
            post_data = {}
            post_data["post_data"] = post.to_json()
            post_data["category_data"] = category.to_json()
            expenses_data[post.uid] = post_data
        
        data["expenses"] = expenses_data
        data["income"] = income_data
        
        return jsonify({"success": True, "data": data})
    return jsonify({"success": False, "message": "User not found"})

@api_bp.route('/add_post/<post_type>/<uuid>/', methods=['POST'])
@firebase_auth_required
def add_post(post_type: str, uuid: str):
    data = request.get_json()
    if data:
        amount_integer_check = is_int(data["amount"])
        if not amount_integer_check:
            return jsonify({"success": False, "message": "Amount must only contain digits."})
        
        new_post = dbo.add_post_to_spending_plan(
            uuid=uuid,
            name=data["source"].strip(),
            amount=data["amount"],
            category_uid=data["category"],
            post_type=post_type
        )
        if new_post:
            return jsonify({"success": True})
        return jsonify({"success": False, "message": "Could not add expense post"})
    return jsonify({"success": False, "message": "No data received"})

@api_bp.route('/spending_categories/<category_type>/', methods=['GET'])
def get_spending_categories(category_type):
    if category_type == "expenses":
        categories = dbo.get_expense_categories()
    elif category_type == "income":
        categories = dbo.get_income_categories()

    if categories:
        category_data = {}
        for category in categories:
            category_data[category.id] = category.to_json()
        return jsonify({"success": True, "data": category_data})
    return jsonify({"success": False, "message": f"Could not retrieve {category_type} categories"})