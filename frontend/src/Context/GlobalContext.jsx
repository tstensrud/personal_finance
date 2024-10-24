import React, { createContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [currency, setCurrency] = useState("NOK");

    const value = {
        currency,
        setCurrency
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };