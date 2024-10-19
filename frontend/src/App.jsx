import { useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home/Home.jsx';
import Assets from './Pages/Assets/Assets.jsx';
import Stocks from './Pages/Stocks/Stocks.jsx';
import Debts from './Pages/Debts/Debts.jsx';
import Spending from './Pages/Spending/Spending.jsx';


import Layout from './UI/Layout';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="debts" element={<Debts />} />
          <Route path="assets" element={<Assets />} />
          <Route path="spending" element={<Spending />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
