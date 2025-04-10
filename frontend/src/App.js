import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inspect from './pages/Inspect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inspect/:carId" element={<Inspect />} />
      </Routes>
    </Router>
  );
}

export default App;
