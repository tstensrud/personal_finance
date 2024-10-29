from sqlalchemy import func, and_, distinct, select, update, cast, String
from uuid import uuid4
from .. import models, db
from .globals import log

##########################
# USER DATA              #
##########################
def get_user(uuid: str) -> models.users:
    user = db.session.query(models.users).filter(models.users.uuid == uuid).first()
    if user:
        return user
    return None

##########################
# SECURITIES             #
##########################
def get_security(uid: str) -> models.securities:
    security = db.session.query(models.securities).filter(models.securities.uid == uid).first()
    if security:
        return security
    return False

def add_security(uuid: str, ticker: str, quantity: int) -> bool:
    uid = str(uuid4())
    new_security = models.securities(
        uid=uid,
        user_uid=uuid,
        quantity=quantity,
        ticker=ticker
    )
    try:
        db.session.add(new_security)
        db.session.commit()
        return True
    except Exception as e:
        log(f"Could not add security: {e}")
        db.session.rollback()
        return False

def get_user_securities(uuid: str) -> list[models.securities]:
    securities = db.session.query(models.securities).filter(models.securities.user_uid == uuid).all()
    if securities:
        return securities
    return None

def delete_security(security_uid: str) -> bool:
    security = get_security(uid = security_uid)
    if security:
        try:
            db.session.delete(security)
            db.session.commit()
            return True
        except Exception as e:
            log(f"Could not find security {e}")
            return False

def update_security(uid: str, new_quantity: int) -> bool:
    security = get_security(uid=uid)
    if security:
        security.quantity = new_quantity
        try:
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            log(f"Could not update quantity: {e}")
            return False

##########################
# DEBTS                  #
##########################
def get_debt_types() -> models.debt_types:
    debt_types = db.session.query(models.debt_types).all()
    return debt_types

def new_debt(uuid: str, type: str, name: str, value: int, end_date: int) -> bool:
    new_uid = str(uuid4())
    new_debt = models.debts(
        uid=new_uid,
        user_uid=uuid,
        debt_type=type,
        debt_name=name,
        value=value,
        end_date=end_date
    )
    try:
        db.session.add(new_debt)
        db.session.commit()
        return True
    except Exception as e:
        log(f"Could not add debt: {e}")
        db.session.rollback()
        return False
    
def get_user_debts(uuid: str) -> tuple[models.debts, models.debt_types]:
    user = get_user(uuid=uuid)
    if user:
        debts = db.session.query(models.debts, models.debt_types).join(
            models.debts, models.debts.debt_type == models.debt_types.uid).filter(
            models.debts.user_uid == uuid).all()
        if debts:
            return debts
        return None
    return None

def new_debt_entry(new_value: int, debt_uid: str) -> bool:
    uid = str(uuid4())
    new_entry = models.debt_entry(
        uid=uid,
        debt_uid=debt_uid,
        value=new_value
    )
    try:
        db.session.add(new_entry)
        db.session.commit()
        return True
    except Exception as e:
        log(f"Could not add debt entry: {e}")
        db.session.rollback()
        return False

def get_debt_entries(debt_uid: str) -> list[models.debt_entry]:
    entries = db.session.query(models.debt_entry).filter(models.debt_entry.debt_uid == debt_uid).all()
    if entries:
        return entries
    return None

##########################
# SPENDING PLAN / BUDGET #
##########################
def get_expense_categories() -> list[models.spending_plan_expense_categories]:
    categories = db.session.query(models.spending_plan_expense_categories).all()
    return categories

def get_income_categories() -> list[models.spending_plan_income_categories]:
    categories = db.session.query(models.spending_plan_income_categories).all()
    return categories

def get_income_post(post_uid: str) -> models.spending_plan_income:
    post = db.session.query(models.spending_plan_income).filter(models.spending_plan_income.uid == post_uid).first()
    if post:
        return post
    return None

def get_expense_post(post_uid: str) -> models.spending_plan_expenses:
    post = db.session.query(models.spending_plan_expenses).filter(models.spending_plan_expenses.uid == post_uid).first()
    if post:
        return post
    return None

def add_post_to_spending_plan(uuid: str, name: str, amount: int, category_uid: str, post_type: str) -> bool:
    uid = str(uuid4())

    if post_type == "expense":
        new_post = models.spending_plan_expenses(
            uid=uid,
            user_uid=uuid,
            type_name=name,
            amount=amount,
            category=category_uid
        )
    if post_type == "income":
        new_post = models.spending_plan_income(
            uid=uid,
            user_uid=uuid,
            type_name=name,
            amount=amount,
            category=category_uid
        )
        
    try:
        db.session.add(new_post)
        db.session.commit()
        return True
    except Exception as e:
        log(f"Error adding expense to spending plan: {e}")
        db.session.rollback()
        return False
    
def get_user_spending_plan_expenses(uuid: str) -> tuple[models.spending_plan_expenses, models.spending_plan_expense_categories]:
    user = get_user(uuid)
    if user:
        spending_plan = db.session.query(models.spending_plan_expenses, models.spending_plan_expense_categories).join(
            models.spending_plan_expense_categories, models.spending_plan_expenses.category == models.spending_plan_expense_categories.uid).filter(
                models.spending_plan_expenses.user_uid == uuid).all()
        if spending_plan:
            return spending_plan
        return None
    return None

def get_user_spending_plan_income(uuid: str) -> tuple[models.spending_plan_income, models.spending_plan_income_categories]:
    user = get_user(uuid)
    if user:
        spending_plan = db.session.query(models.spending_plan_income, models.spending_plan_income_categories).join(
            models.spending_plan_income_categories, models.spending_plan_income.category == models.spending_plan_income_categories.uid).filter(
                models.spending_plan_income.user_uid == uuid).all()
        if spending_plan:
            return spending_plan
        return None
    return None

def update_spending_plan_post(post_uid: str, expense: bool, data: int) -> bool:
    if expense:
        post = get_expense_post(post_uid=post_uid)
    else:
        post = get_income_post(post_uid=post_uid)
    post.amount = data
    try:
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        log(f"Could not update post: {e}")
        return False

def delete_spending_plan_post(post_uid: str, expense: bool) -> bool:
    if expense:
        post = get_expense_post(post_uid=post_uid)
    else:
        post = get_income_post(post_uid=post_uid)
    try:
        db.session.delete(post)
        db.session.commit()
        return True
    except Exception as e:
        log(f"Could not delete spending plan post: {e}")
        return False