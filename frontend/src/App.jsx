import { useContext, useState } from 'react'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthContext } from './Context/AuthContext.jsx';

import Home from './Pages/Home/Home.jsx';
import Assets from './Pages/Assets/Assets.jsx';
import Stocks from './Pages/Stocks/Stocks.jsx';
import Debts from './Pages/Debts/Debts.jsx';
import Spending from './Pages/Spending/Spending.jsx';
import Login from './Pages/Login/Login.jsx';
import LogOut from './Pages/Logout/Logout.jsx';
import Account from './Pages/Account/Account.jsx';


import Layout from './UI/Layout';

function App() {

  const { currentUser } = useContext(AuthContext);

  const RequiredAuth = ({ children }) => {
    return (currentUser ? (children) : <Navigate to="/" />);
  }

  return (
    <Router>
      <Routes>
        {
          !currentUser ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Login />} />
            </>
          ) : (
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<RequiredAuth><Home /></RequiredAuth>} />
              <Route path="stocks" element={<RequiredAuth><Stocks /></RequiredAuth>} />
              <Route path="debts" element={<RequiredAuth><Debts /></RequiredAuth>} />
              <Route path="assets" element={<RequiredAuth><Assets /></RequiredAuth>} />
              <Route path="spending" element={<RequiredAuth><Spending /></RequiredAuth>} />
              <Route path="account" element={<RequiredAuth><Account /></RequiredAuth>} />
              <Route path="logout" element={<LogOut />}/>
            </Route>
          )
        }
      </Routes>
    </Router>
  )
}

export default App
