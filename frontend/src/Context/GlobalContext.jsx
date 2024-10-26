import React, { createContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [currency, setCurrency] = useState("");
    const [globalLoading, setGlobalLoading] = useState(false);

    const value = {
        currency,
        setCurrency,
        globalLoading,
        setGlobalLoading
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };