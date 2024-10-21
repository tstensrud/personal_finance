import { useContext, useState } from 'react'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthContext } from './context/AuthContext.jsx';

import Home from './pages/home/Home.jsx';
import Assets from './pages/assets/Assets.jsx';
import Securities from './pages/securities/Securities.jsx';
import Debts from './pages/debts/Debts.jsx';
import Spending from './pages/spending/Spending.jsx';
import Login from './pages/login/Login.jsx';
import LogOut from './pages/logout/Logout.jsx';
import Account from './pages/account/Account.jsx';
import NotFound from './ui/NotFound.jsx';


import Layout from './ui/Layout';
import Register from './pages/register/Register.jsx';

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
              <Route path="register" element={<Register />} />
            </>
          ) : (
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<RequiredAuth><Home /></RequiredAuth>} />
              <Route path="securities" element={<RequiredAuth><Securities /></RequiredAuth>} />
              <Route path="debts" element={<RequiredAuth><Debts /></RequiredAuth>} />
              <Route path="assets" element={<RequiredAuth><Assets /></RequiredAuth>} />
              <Route path="spending" element={<RequiredAuth><Spending /></RequiredAuth>} />
              <Route path="account" element={<RequiredAuth><Account /></RequiredAuth>} />
              <Route path="logout" element={<LogOut />}/>
              <Route path="*" element={<NotFound />} />
            </Route>
          )
        }
      </Routes>
    </Router>
  )
}

export default App
