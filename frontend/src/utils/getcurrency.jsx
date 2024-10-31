export function getCurrency(currency) {
    return fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Could not get currency");
        }
        return response.json();
    })
    .catch((error) => console.error(error))
}

/* https://github.com/fawazahmed0/exchange-api */