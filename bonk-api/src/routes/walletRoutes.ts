import { Router } from 'express';
import { getWalletBalance, getTokenHoldings } from '../controllers/walletController';

const router = Router();


router.get('/balance/:wallet', getWalletBalance);
router.get('/holdings/:wallet', getTokenHoldings);

export default router;