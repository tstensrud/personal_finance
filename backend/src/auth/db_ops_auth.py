from sqlalchemy import func, and_, distinct, select, update, cast, String
from firebase_admin import auth
from uuid import uuid4
from .. import models, db
from .globals import log


def register_new_user(firstname: str, lastname: str, email: str, password: str) -> bool:
    try:
        new_firebase_user = auth.create_user(
            email=email,
            email_verified=False,
            password=password,
            display_name=firstname,
            photo_url=None,
            disabled=False
        )
    except Exception as e:
        log(f"Error creating new firebase user: {e}")
        return False
    if new_firebase_user:
        new_user = models.users(
            uuid=new_firebase_user.uid,
            email=email,
            first_name=firstname,
            last_name=lastname,
            is_admin=False,
            deactivated=False
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            return True
        except Exception as e:
            log(f"Error creating new user in databse {e}")
            db.session.rollback()
            return False