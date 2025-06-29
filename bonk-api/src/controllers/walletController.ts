import { Request, Response } from 'express';
import { getWalletBalances, getAllTokenHoldings, getRecentTransactions } from '../services/solanaService';
import { isValidSolanaAddress } from '../utils';


export async function getWalletBalance(req: Request, res: Response): Promise<void> {
  try {
    const walletAddress = req.params.wallet;
    
    if (!isValidSolanaAddress(walletAddress)) {
      res.status(400).json({ error: 'Invalid wallet address format' });
      return;
    }

    let retryDelay = 500;
    let balances;
    
    while (!balances) {
      try {
        balances = await getWalletBalances(walletAddress);
      } catch (err) {
        if ((err as Error).message.includes('429')) {
          console.log(`Server responded with 429 Too Many Requests. Retrying after ${retryDelay}ms delay...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          retryDelay *= 2;
          continue;
        }
        throw err;
      }
    }
    
    res.json({
      address: walletAddress,
      solBalance: balances.solBalance,
      bonkBalance: balances.tokenBalances.bonk.amount,
      tokens: balances.tokenBalances
    });
  } catch (error) {
    console.error('Error in getWalletBalance controller:', error);
    res.status(500).json({ 
      error: 'Failed to fetch wallet balance',
      message: (error as Error).message 
    });
  }
}

export async function getTokenHoldings(req: Request, res: Response) {
  try {
    const walletAddress = req.params.wallet;
    
    // Get holdings with exponential backoff retry
    let retryDelay = 500;
    let holdings;
    
    while (!holdings) {
      try {
        holdings = await getAllTokenHoldings(walletAddress);
      } catch (err) {
        if ((err as Error).message.includes('429')) {
          console.log(`Server responded with 429 Too Many Requests. Retrying after ${retryDelay}ms delay...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          retryDelay *= 2;
          continue;
        }
        throw err;
      }
    }
    
    res.json({ success: true, holdings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get token holdings', message: (error as Error).message });
  }
}

export async function getTransactionHistory(req: Request, res: Response): Promise<void> {
  try {
    const walletAddress = req.params.wallet;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    if (!isValidSolanaAddress(walletAddress)) {
      res.status(400).json({ error: 'Invalid wallet address format' });
      return;
    }

    if (isNaN(limit) || limit < 1 || limit > 50) {
      res.status(400).json({ error: 'Invalid limit parameter. Must be between 1 and 50.' });
      return;
    }

    const transactions = await getRecentTransactions(walletAddress, limit);
    
    res.json({
      address: walletAddress,
      transactions
    });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ error: `Failed to fetch transaction history: ${(error as Error).message}` });
  }
}

