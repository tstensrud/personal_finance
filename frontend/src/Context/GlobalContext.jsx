import React, { createContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const value = {

    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }