from . import db
from sqlalchemy import func, DateTime, Index

class users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uuid = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())
    deactivated = db.Column(db.Boolean, default=False)

    def to_json(self):
        return {
            "id" : self.id,
            "uuid": self.uuid,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_admin": self.is_admin,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "deactivated": self.deactivated
        }

class asset_types(db.Model):
    __table_name__ = "asset_types"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.String(255), unique=True, nullable=False)
    type = db.Column(db.String(255), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "type": self.type
        }

class assets(db.Model):
    __tablename__ = "assets"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.String(255), unique=True, nullable=False)
    user_uid = db.Column(db.String(255), db.ForeignKey('users.uuid'), nullable=False)
    asset_type = db.Column(db.String(255), db.ForeignKey('asset_types.uid'), nullable=False)
    asset_name = db.Column(db.String(255), nullable=False)
    value = db.Column(db.Integer, nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_json(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "userUid": self.user_uid,
            "asset_type": self.asset_type,
            "asset_name": self.asset_name,
            "value": self.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class securities(db.Model):
    __tablename__ = "securities"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.String(255), unique=True, nullable=False)
    user_uid = db.Column(db.String(255), db.ForeignKey('users.uuid'), nullable=False)
    quantity = db.Column(db.Integer)
    ticker = db.Column(db.String(255))

    __table_args__ = (
        Index("idx_ticker", "ticker"),
    )

    def to_json(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "user_uid": self.user_uid,
            "quantity": self.quantity,
            "ticker": self.ticker
        }

class debt_types(db.Model):
    __table_name__ = "debt_types"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.String(255), unique=True, nullable=False)
    type = db.Column(db.String(255), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "type": self.type
        }
    
class debts(db.Model):
    __tablename__ = "debts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.String(255), unique=True, nullable=False)
    user_uid = db.Column(db.String(255), db.ForeignKey('users.uuid'), nullable=False)
    debt_type = db.Column(db.String(255), db.ForeignKey('debt_types.uid'), nullable=False)
    debt_name = db.Column(db.String(255), nullable=False)
    value = db.Column(db.Integer, nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_json(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "userUid": self.user_uid,
            "debt_type": self.debt_type,
            "debt_name": self.debt_name,
            "value": self.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }