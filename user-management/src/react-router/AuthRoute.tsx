import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authentication';
import { JSX } from 'react';

const AuthRoute = ({ children }: { children: JSX.Element }) => {
    const accessToken = useAuthStore((state) => state.accessToken);

    return accessToken ? <Navigate to="/dashboard" replace /> : children;
};

export default AuthRoute;
