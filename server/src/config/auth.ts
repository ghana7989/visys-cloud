interface User {
    email: string;
    password: string;
}

export const allowedUsers: User[] = [
    { email: 'admin@admin.com', password: 'admin123' },
    { email: 'user1@user1.com', password: 'pass123' }
];

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 
