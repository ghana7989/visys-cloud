import express from 'express';
import { webAgentController } from '../controllers/webagent.controller';

const router = express.Router();

router.post('/login', webAgentController.login);

export { router as webAgentRouter }; 
