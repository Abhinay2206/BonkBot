import { Router, } from 'express';
import { getWalletBalance, getTokenHoldings, getTransactionHistory } from '../controllers/walletController';

const router = Router();


router.get('/balance/:wallet', getWalletBalance);
router.get('/holdings/:wallet', getTokenHoldings);
router.get('/transactions/:wallet', getTransactionHistory);

export default router;