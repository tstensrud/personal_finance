from firebase_admin import auth
from flask import Blueprint, jsonify, request
from functools import wraps
from . import db_ops_api as dbo
from .securities import get_security_data, get_security_historic_data, ticker_exists
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
# SECURITIES             #
##########################
@api_bp.route('/securities/get/<uuid>/', methods=['GET'])
@firebase_auth_required
def get_securities(uuid: str):
    securities = dbo.get_user_securities(uuid=uuid)
    if securities:
        securities_data = {}
        total_value = 0
        for security in securities:
            security_data = get_security_data(security.ticker)
            
            security_historic_one_day = get_security_historic_data(
                ticker_symbol=security.ticker,
                timeframe="1d"
            )

            closing_value = float(security_historic_one_day.iloc[0])
            
            total_value = total_value + (closing_value * security.quantity)

            securities_data[security.uid] = {
                "server_data": security.to_json(),
                "security_data" : security_data.info,
                "closing_value": closing_value,
            }

        totals = {
            "total_companies_owned": len(securities),
            "total_value": total_value
        }

        return jsonify({"success": True, "data": securities_data, "totals": totals})
    return jsonify({"success": False, "message": "No securities found"})
    
@api_bp.route('/securities/add/<uuid>/', methods=['POST'])
@firebase_auth_required
def add_security(uuid: str):
    user = dbo.get_user(uuid=uuid)
    if user:
        data = request.get_json()
        if data:
            quantity = data["quantity"].strip()
            ticker = data["ticker"].strip()
            
            find_ticker = ticker_exists(ticker)
            if not find_ticker:
                return jsonify({"success": False, "message": f"Could not find ticker {ticker}"})
            
            if not is_int(quantity):
                return jsonify({"success": False, "message": "Quantity can only contain whole numbers"})
            
            new_security = dbo.add_security(
                uuid=uuid,
                ticker=ticker,
                quantity=quantity
            )

            if new_security:
                return jsonify({"success": True})
            return jsonify({"success": False, "message": "Could not add security"})
        return jsonify({"success": False, "message": "No data received"})
    return jsonify({"success": False, "message": "User not found"})

@api_bp.route('/securities/delete/', methods=['DELETE'])
@firebase_auth_required
def delete_security():
    data = request.get_json()
    if data:
        security_uid = data['uid']
        deleted_security = dbo.delete_security(security_uid=security_uid)
        if deleted_security:
            return jsonify({"success": True, "message": "Deleted"})
        return jsonify({"success": False, "message": "Could not delete security"})
    return jsonify({"success": False, "message": "No data received"})

@api_bp.route('/securities/update/<security_uid>/', methods=['PATCH'])
def update_security(security_uid: str):
    data = request.get_json()
    if data:
        uid = security_uid
        quantity = data['quantity'].strip()
        if not is_int(quantity):
            return jsonify({"success": False, "message": "Quantity can only contain whole numbers"})
        updated_security = dbo.update_security(uid=uid, new_quantity=quantity)
        if updated_security:
            return jsonify({"success": True})
        return jsonify({"success": False, "message": "Could not update security"})
    return jsonify({"success": False, "message": "No data received"})

##########################
# DEBTS                  #
##########################
@api_bp.route('/debts/debt_types/', methods=['GET'])
@firebase_auth_required
def get_debt_types():
    debt_types = dbo.get_debt_types()
    debt_type_data = {}
    for debt_type in debt_types:
        debt_type_data[debt_type.type] = debt_type.to_json()
    return jsonify({"success": True, "data": debt_type_data})

@api_bp.route('/debts/get/<uuid>/', methods=['GET'])
@firebase_auth_required
def get_debts(uuid: str):
    debts = dbo.get_user_debts(uuid=uuid)
    if debts:
        debt_data = {}
        for debt_item, type_item in debts:
            current_debt_data = {}
            current_debt_data['debt_data'] = debt_item.to_json()
            current_debt_data['category_data'] = type_item.to_json()
            latest_debt_entry = dbo.get_debt_entry_latest(debt_uid=debt_item.uid)
            if latest_debt_entry:
                current_debt_data['debt_data']['latest_value'] = latest_debt_entry.value
            else:
                current_debt_data['debt_data']['latest_value'] = debt_item.value
            debt_data[debt_item.uid] = current_debt_data
        return jsonify({"success": True, "data": debt_data})
    return jsonify({"success": False, "message": "No debts registered"})

@api_bp.route('/debts/new/<uuid>/', methods=["POST"])
def new_debt(uuid: str):
    data = request.get_json()
    if data:
        if not is_int(data['value'].strip()):
            return jsonify({"success": False, "message": "Value can only be whole numbers"})
        name = data['name'].strip()
        value = data['value'].strip()
        end_date = data['end_date'].strip()
        debt_type = data['debt_type']
        new_user_debt = dbo.new_debt(
            uuid=uuid,
            type=debt_type,
            name=name,
            value=value,
            end_date=end_date
        )
        if new_user_debt:
            return jsonify({"success": True})
        return jsonify({"success": False, "message": "Could not add debt"})
    return jsonify({"success": False, "message": "No data received"})

@api_bp.route('/debts/new_entry/<debt_uid>/', methods=['POST'])
@firebase_auth_required
def new_debt_entry(debt_uid: str):
    data = request.get_json()
    if data:
        new_value = data['value'].strip()
        if not is_int(new_value):
            return jsonify({"success": False, "message": "Only whole numbers in value"})
        new_entry = dbo.new_debt_entry(new_value=new_value, debt_uid=debt_uid)
        if new_entry:
            return jsonify({"success": True})
        return jsonify({"success": False, "message": "Could not add debt entry"})
    return jsonify({"success": False, "message": "No data received"})

@api_bp.route('/debts/debt_entries/<debt_uid>/', methods=['GET'])
@firebase_auth_required
def get_debt_entries(debt_uid: str):
    entries = dbo.get_debt_entries(debt_uid=debt_uid)
    if entries:
        entries_data = {}
        for entry in entries:
            entries_data[entry.uid] = entry.to_json()
        return jsonify({"success": True, "data": entries_data})
    return jsonify({"success": False, "message": "No entries found"})

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
@firebase_auth_required
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

@api_bp.route('/spending_plan/update_post/', methods=['PATCH'])
@firebase_auth_required
def update_post():
    data = request.get_json()
    if data:
        updated_post = dbo.update_spending_plan_post(
            post_uid=data['post_uid'],
            expense=data['expense'],
            data=data['data']
        )
        if updated_post:
            return jsonify({"success": True})
        return jsonify({"success": False, "message": "Could not update post"})    
    return jsonify({"success": False, "message": "No data received"})

@api_bp.route('/spending_plan/delete_post/', methods=['DELETE'])
@firebase_auth_required
def delete_post():
    data = request.get_json()
    if data:
        deleted_post = dbo.delete_spending_plan_post(
            post_uid=data['post_uid'],
            expense=data['expense']
        )
        if deleted_post:
            return jsonify({"success": True})
        return jsonify({"success": False, "message": "Could not delete spending plan post"})    
    return jsonify({"success": False, "message": "Did not receive any data"})