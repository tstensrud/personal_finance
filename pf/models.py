from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Stocks(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(5))
    name = db.Column(db.String(100))
    value = db.Column(db.Integer)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(50))
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    stocks = db.relationship('Stocks')