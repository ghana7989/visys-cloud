import { notifications } from "@mantine/notifications";
import { API_BASE_URL } from '../../config';

export interface LoginCredentials {
    user_id: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
}

export const api = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await fetch(`${API_BASE_URL}/webagent/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            notifications.show({
                title: 'Login failed',
                message: data.message || 'Please check your credentials and try again',
                color: 'red',
            });
            throw new Error('Login failed');
        }else{
            notifications.show({
                title: 'Login successful',
                message: data.message || 'You are now logged in',
                color: 'green',
            });
            window.location.href = '/';
        }

        return data;
    }
}; 
