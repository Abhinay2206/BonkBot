import express from 'express';
import { executeMarketOrder, setupLimitOrder, setupDCA, checkPriceAlerts, getPrice } from '../controllers/tradingController';

const router = express.Router();

router.post('/market-order', executeMarketOrder);
router.post('/limit-order', setupLimitOrder);
router.post('/dca', setupDCA);
router.get('/check-alerts', checkPriceAlerts);
router.get('/price/:token', getPrice);

export default router;