import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inspect from './pages/Inspect';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/inspect/:carId' element={<Inspect />} />
      </Routes>
    </Router>
  );
}
