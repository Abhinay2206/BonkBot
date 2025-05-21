import { Request, Response } from 'express';
import { getWalletBalances } from '../services/solanaService';
import { isValidSolanaAddress } from '../utils';


export async function getWalletBalance(req: Request, res: Response): Promise<void> {
  try {
    const walletAddress = req.params.wallet;
    
    // Validate wallet address format
    if (!isValidSolanaAddress(walletAddress)) {
      res.status(400).json({ error: 'Invalid wallet address format' });
      return;
    }

    // Get wallet balances
    const balances = await getWalletBalances(walletAddress);
    
    // Return the balances
    res.json({
      address: walletAddress,
      solBalance: balances.solBalance,
      bonkBalance: balances.tokenBalances.bonk.amount,
      // Include all token balances in a more structured way
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