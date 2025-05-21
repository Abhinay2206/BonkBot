import { Router } from 'express';
import { getWalletBalance } from '../controllers/walletController';

const router = Router();


router.get('/balance/:wallet', getWalletBalance);

export default router;