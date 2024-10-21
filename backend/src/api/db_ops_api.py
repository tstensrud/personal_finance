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