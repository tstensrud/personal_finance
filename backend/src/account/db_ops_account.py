from sqlalchemy import func, and_, distinct, select, update, cast, String
from uuid import uuid4
from .. import models, db
from .globals import log

def get_user(uuid: str) -> models.users:
    user = db.session.query(models.users).filter(models.users.uuid == uuid).first()
    if user:
        return user
    return None

def set_currency(uuid: str, currency: str) -> bool:
    user = get_user(uuid=uuid)
    user.currency = currency
    try:
        db.session.commit()
        return True
    except Exception as e:
        log(f"Could not set currency: {e}")
        db.session.rollback()
        return False