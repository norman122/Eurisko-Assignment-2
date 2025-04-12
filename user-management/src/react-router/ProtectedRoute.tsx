import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authentication';
import { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const accessToken = useAuthStore((state) => state.accessToken);

    return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
