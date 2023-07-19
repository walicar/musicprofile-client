import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage content={"this is home page content"}/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
