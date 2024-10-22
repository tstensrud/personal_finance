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
# SPENDING PLAN / BUDGET #
##########################
def get_expense_categories() -> list[models.spending_plan_expense_categories]:
    categories = db.session.query(models.spending_plan_expense_categories).all()
    return categories

def get_income_categories() -> list[models.spending_plan_income_categories]:
    categories = db.session.query(models.spending_plan_income_categories).all()
    return categories


def add_expense_spending_plan(uuid: str, name: str, amount: int, category_uid: str, post_type: str) -> bool:
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