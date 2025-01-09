import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';

export interface AuthRequest extends Request {
    user?: { username: string };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET) as { username: string };
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}; 
