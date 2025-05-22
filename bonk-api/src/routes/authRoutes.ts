import express, { RequestHandler } from 'express';
import { register, login, validateToken } from '../controllers/authController';

const router = express.Router();

router.post('/register', register as RequestHandler);

router.post('/login', login as RequestHandler);

router.get('/validate-token', validateToken as RequestHandler);

export default router;
