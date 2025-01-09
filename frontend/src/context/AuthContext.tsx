import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    customerId: string | null;
    setAuth: (custId: string) => void;
    clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customerId, setCustomerId] = useState<string | null>(() => {
        return sessionStorage.getItem('customerId');
    });

    const isAuthenticated = !!customerId;

    const setAuth = (custId: string) => {
        sessionStorage.setItem('customerId', custId);
        setCustomerId(custId);
    };

    const clearAuth = () => {
        sessionStorage.removeItem('customerId');
        setCustomerId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, customerId, setAuth, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
}; 
