import { Request, Response } from 'express';
import { createSwapTransaction, scheduleLimitOrder, scheduleDCAOrder, getCurrentPrice, getTriggeredAlerts } from '../services/tradingService';

export async function executeMarketOrder(req: Request, res: Response) {
  try {
    const { fromToken, toToken, amount, wallet } = req.body;
    const result = await createSwapTransaction(fromToken, toToken, amount, wallet);
    res.json({ success: true, tx: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute market order', message: (error as Error).message });
  }
}

export async function setupLimitOrder(req: Request, res: Response) {
  try {
    const { fromToken, toToken, amount, targetPrice, wallet } = req.body;
    await scheduleLimitOrder({ fromToken, toToken, amount, targetPrice, wallet });
    res.json({ success: true, message: 'Limit order scheduled' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set limit order', message: (error as Error).message });
  }
}

export async function setupDCA(req: Request, res: Response) {
  try {
    const { interval, fromToken, toToken, amount, wallet } = req.body;
    await scheduleDCAOrder({ interval, fromToken, toToken, amount, wallet });
    res.json({ success: true, message: 'DCA order scheduled' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule DCA', message: (error as Error).message });
  }
}

export async function checkPriceAlerts(_req: Request, res: Response) {
  try {
    const alerts = await getTriggeredAlerts();
    res.json({ success: true, alerts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check alerts', message: (error as Error).message });
  }
}

export async function getPrice(req: Request, res: Response) {
  try {
    const { token } = req.params;
    const price = await getCurrentPrice(token);
    res.json({ token, price });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get price', message: (error as Error).message });
  }
}
