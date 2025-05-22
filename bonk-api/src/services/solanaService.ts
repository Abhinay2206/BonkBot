import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { config } from '../config';
import { WalletBalance, TokenInfo, TokensMap } from '../types';
import { lamportsToSol } from '../utils';

const connection = new Connection(
  config.solana.rpcUrl, // Use Alchemy RPC URL instead of public RPC
  config.solana.commitment as any
);

// SPL token program ID
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

export async function getWalletBalances(walletAddress: string): Promise<WalletBalance> {
  try {
    const publicKey = new PublicKey(walletAddress);
    
    // Get SOL and token balances in parallel
    const [lamports, tokenAccounts] = await Promise.all([
      connection.getBalance(publicKey),
      connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID
      })
    ]);

    // Process token balances
    const tokenBalances: { [tokenName: string]: { amount: number; mintAddress: string } } = {
      bonk: { amount: 0, mintAddress: config.tokens.bonk.mintAddress }
    };

    // Update bonk balance if found
    tokenAccounts.value.forEach(({ account }) => {
      const info = account.data.parsed.info;
      if (info.mint === config.tokens.bonk.mintAddress) {
        tokenBalances.bonk.amount = info.tokenAmount.uiAmount || 0;
      }
    });

    return {
      solBalance: lamportsToSol(lamports),
      tokenBalances
    };

  } catch (error) {
    console.error('Error fetching wallet balances:', error);
    throw new Error(`Failed to fetch wallet balances: ${(error as Error).message}`);
  }
}

export async function getAllTokenHoldings(walletAddress: string): Promise<{ mintAddress: string; amount: number }[]> {
  try {
    const publicKey = new PublicKey(walletAddress);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });

    return tokenAccounts.value
      .map(({ account }) => ({
        mintAddress: account.data.parsed.info.mint,
        amount: account.data.parsed.info.tokenAmount?.uiAmount || 0,
      }))
      .filter(token => token.amount > 0);
  } catch (error) {
    console.error("❌ Error fetching token holdings:", error);
    throw new Error(`Failed to fetch all token holdings: ${(error as Error).message}`);
  }
}