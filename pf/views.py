from flask import Blueprint, render_template, request
from flask_login import login_required, current_user
import requests

views = Blueprint("views", __name__)

@views.route('/')
def index():
    return render_template("index.html", user=current_user)

@views.route('/home')
@login_required
def home():
    return render_template("home.html", user=current_user)

@views.route('/account')
@login_required
def account():
    return render_template("account.html", user=current_user)

@views.route('/stocks', methods=['GET', 'POST'])
@login_required
def stocks():
    if request.method == "POST":
        pass
    return render_template("stocks.html", user=current_user)


'''
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
# https://www.alphavantage.co/documentation/
ticker = "TSLA"
url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}}&apikey=XF9AIOEDC8T2Q4SZ'
r = requests.get(url)
data = r.json()

print(data)
'''