import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './components/DashboardPage';
import ProductListPage from './components/ProductListPage';
import UserProfilePage from './components/UserProfilePage';
import SalesPage from './components/SalesPage';
import OrdersPage from './components/OrdersPage';
import CustomerPage from './components/Customer/CustomerPage';
import Admin from './components/Admin';
import MasterAdmin from './components/MasterAdmin';
import NotAuthorizedPage from './components/NotAuthorizedPage';
import { getAuth } from 'firebase/auth';
import fetchUserRole from './components/utils/fetchUserRole'; 

const auth = getAuth();

function App() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('guest');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRoleAndSetState = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                try {
                    const userRole = await fetchUserRole();
                    setRole(userRole);
                    setUser(currentUser);
                } catch (error) {
                    console.error('Failed to fetch user role:', error);
                }
            }
            setLoading(false);
        };
        fetchUserRoleAndSetState();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Please wait...</div>;
    }

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute user={user} role={role} requiredRole="seller">
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/customer"
                    element={
                        <ProtectedRoute user={user} role={role} requiredRole="customer">
                            <CustomerPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute user={user} role={role} requiredRole="admin">
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/master-admin"
                    element={
                        <ProtectedRoute user={user} role={role} requiredRole="MasterAdmin">
                            <MasterAdmin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute user={user} role={role} requiredRole="seller">
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sales"
                    element={
                        <ProtectedRoute user={user} role={role} requiredRole="seller">
                            <SalesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute user={user} role={role} requiredRole="seller">
                            <ProductListPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute user={user} role={role} requiredRole="seller">
                            <UserProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/not-authorized" element={<NotAuthorizedPage />} />
            </Routes>
        </Router>
    );
}

export default App;
