
interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // const { isAuthenticated } = useAuth();

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    return <>{children}</>;
}; 
