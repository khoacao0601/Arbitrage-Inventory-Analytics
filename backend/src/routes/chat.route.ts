import { Router } from 'express';
import { streamChat } from '../controllers/chat.controller';

const router = Router();
router.post('/', streamChat);

export default router;