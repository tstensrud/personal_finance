from flask import Blueprint, jsonify

views = Blueprint("views", __name__)

@views.route("/", methods=['GET'])
def status():
    return jsonify({"status": "OK", "message": "Running"})