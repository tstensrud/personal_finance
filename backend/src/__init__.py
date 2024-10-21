import firebase_admin
from firebase_admin import credentials

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import os
from os import path
from dotenv import load_dotenv  

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    load_dotenv()

    firebase_credentials = os.getenv("FIREBASE_CREDENTIALS")

    try:
        if not firebase_admin._apps:
            cred = credentials.Certificate(firebase_credentials)
            firebase_admin.initialize_app(cred)
    except Exception as e:
        print(f"Error initializing Firebase: {e}")
        raise

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('EXTERNAL_DB_URL')
    #app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')

    db.init_app(app)

    # Blueprints
    from .views import views
    from .auth import auth
    from .account import account
    from .api import api

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth.auth_bp, url_prefix="/auth")
    app.register_blueprint(api.api_bp, url_prefix="/api")
    app.register_blueprint(account.account_bp, url_prefix="/account")

    with app.app_context():
        from . import models
        db.create_all()

    return app