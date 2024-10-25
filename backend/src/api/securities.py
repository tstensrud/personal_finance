import yfinance as yf
from requests.exceptions import HTTPError

def get_security_data(ticker: str):
    data = yf.Ticker(ticker)
    if data:
        return data
    return None

def get_stock_data(ticker_symbol: str):
    security = yf.Ticker(ticker_symbol)
    
    try:
        data = security.history(period="1d")
        if data.empty:
            print(f"No data found for ticker symbol: {ticker_symbol}")
        else:
            print(data)

    except HTTPError as http_err:
        print(f"HTTP error occurred for {ticker_symbol}: {http_err}")
    except KeyError as key_err:
        print(f"Data point missing for {ticker_symbol}: {key_err}")
    except Exception as e:
        print(f"An unexpected error occurred for {ticker_symbol}: {e}")
