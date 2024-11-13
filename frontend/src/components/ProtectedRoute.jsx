// frontend/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { auth } = useAuth();


    if (!auth) {
        return <Navigate to="/login" />;
    }

    return children;
}
