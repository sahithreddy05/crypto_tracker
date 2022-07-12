import "./App.css";
import React from 'react';
import Dashboard from './Dashboard';
import Login from './Login'

import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>

      <HashRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </div>
  )


}

export default App;