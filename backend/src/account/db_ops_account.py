from sqlalchemy import func, and_, distinct, select, update, cast, String
from uuid import uuid4
from .. import models, db
from .globals import log

def get_user(uuid: str) -> models.users:
    user = db.session.query(models.users).filter(models.users.uuid == uuid).first()
    if user:
        return user
    return None