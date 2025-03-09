import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Budget from './pages/Budget';
import UserPage from './pages/UserPage';
import Settings from './pages/Settings';
import ExpensePage from './pages/Expense';

import Loan from './pages/Loan';
import BillPage from './pages/bill';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check localStorage for existing login session on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/expenses" element={<ExpensePage />} />
                <Route path="/bill" element={<BillPage />} />
                <Route path="/user" element={<UserPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/loan" element={<Loan />} />
            </Routes>
        </Router>
    );
}

export default App;
