import yfinance as yf
from requests.exceptions import HTTPError

def get_security_data(ticker: str):
    data = yf.Ticker(ticker)
    if data:
        return data
    return None

def ticker_exists(ticker: str) -> bool:
    stock = yf.Ticker(ticker=ticker)
    data = stock.history(period="1d")
    return not data.empty

def get_security_historic_data(ticker_symbol: str, timeframe: str):
    security = yf.Ticker(ticker_symbol)
    
    try:
        data = security.history(period=timeframe)
        if data.empty:
            return None
        else:
            return data['Close']

    except HTTPError as http_err:
        print(f"HTTP error occurred for {ticker_symbol}: {http_err}")
    except KeyError as key_err:
        print(f"Data point missing for {ticker_symbol}: {key_err}")
    except Exception as e:
        print(f"An unexpected error occurred for {ticker_symbol}: {e}")
