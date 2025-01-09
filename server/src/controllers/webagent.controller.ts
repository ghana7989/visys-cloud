import { Request, Response } from 'express';
import WebAgent from '../models/WebAgent';

export class WebAgentController {
  async login(req: Request, res: Response) {
    try {
      const { user_id, password } = req.body;

      if (!user_id || !password) {
        return res.status(400).json({ message: 'User ID and password are required' });
      }

      const webAgent = await WebAgent.login(user_id, password);

      if (!webAgent) {
        return res.status(401).json({ message: 'Invalid credentials or account is inactive/locked' });
      }

      res.json({
        message: 'Login successful',
        user: {
          web_agent_id: webAgent.web_agent_id,
          web_agent_name: webAgent.web_agent_name,
          user_id: webAgent.user_id,
          location: webAgent.location
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        message: 'Error during login',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const webAgentController = new WebAgentController(); 
