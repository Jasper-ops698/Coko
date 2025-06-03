import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth();

function ProtectedRoute({ children, requiredRole }) {
    const [user, loading] = useAuthState(auth);
    const [role, setRole] = useState(null);
    const [checkingRole, setCheckingRole] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                setRole(idTokenResult.claims.role || 'guest');
            }
            setCheckingRole(false);
        };

        if (user) {
            fetchUserRole();
        } else {
            setCheckingRole(false);
        }
    },  [user]);;
    if (loading || checkingRole) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>; // Show loading state
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        // Redirect to a "Not Authorized" page instead of the homepage
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
}

export default ProtectedRoute;
