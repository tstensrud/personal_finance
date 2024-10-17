import { useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import PersonalFinance from './Pages/Index/PersonalFinance';
import Layout from './UI/Layout';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PersonalFinance />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
