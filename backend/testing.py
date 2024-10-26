import json
import requests
import urllib.parse


class RequestHandler(object):
    def __init__(self, endpoint, api_key):
        self.endpoint = endpoint
        self.api_key = api_key

    def __to_canonical_querystring(self, params):
        canonical_querystring = ""
        # parameters have to be sorted alphabetically for the signing part
        for param_key, param_value in sorted(params.items()):
            if canonical_querystring != "":
                canonical_querystring += "&"
            canonical_querystring += param_key + "=" + urllib.parse.quote(param_value)
        return canonical_querystring

    def request(self, path, method="GET", data=None, params={}):
        canonical_querystring = self.__to_canonical_querystring(params)
        data = json.dumps(data) if data else None
        headers = {}

        headers["Accept"] = "application/json"
        headers["Content-type"] = "application/json"
        headers["x-api-key"] = self.api_key

        request_url = self.endpoint + path + "?" + canonical_querystring

        if method == "GET":
            return requests.get(request_url, headers=headers)
        if method == "POST":
            return requests.post(request_url, headers=headers, data=data)
        if method == "PUT":
            return requests.put(request_url, headers=headers, data=data)
        if method == "DELETE":
            return requests.delete(request_url, headers=headers, data=data)
        raise RuntimeError("Unknown method: " + method)
    
api_key = "a8b9fcc17dd3488fa5c974c62ba18a80"

request_handler = RequestHandler(endpoint="https://developer-api-testmode.dnb.no", api_key=api_key)


def get_currency_conversions(quoteCurrency):
    response = request_handler.request(path=f"/currencies/v1/convert/{quoteCurrency}")
    return response.json()


def get_currency_conversion(baseCurrency, quoteCurrency):
    response = request_handler.request(
        path=f"/currencies/v1/{baseCurrency}/convert/{quoteCurrency}"
    )
    return response.json()


def get_test_customers():
    response = request_handler.request(path="/test-customers/v0")
    return response.json()


def main():
    test_customers = get_test_customers()
    print("\nTest customers: " + json.dumps(test_customers, indent=4, sort_keys=True))

    currencies = get_currency_conversions("NOK")
    print("\nCurrencies: " + json.dumps(currencies, indent=4, sort_keys=True))

    currency = get_currency_conversion("EUR", "NOK")
    print("\nEUR -> NOK: " + json.dumps(currency, indent=4, sort_keys=True))

main()