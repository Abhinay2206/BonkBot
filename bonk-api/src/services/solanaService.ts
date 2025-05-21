import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { config } from '../config';
import { WalletBalance, TokenInfo, TokensMap } from '../types';
import { lamportsToSol } from '../utils';

const connection = new Connection(
  clusterApiUrl(config.solana.cluster),
  config.solana.commitment as any
);

// SPL token program ID
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');


export async function getSolBalance(walletAddress: string): Promise<number> {
  try {
    const publicKey = new PublicKey(walletAddress);
    const lamports = await connection.getBalance(publicKey);
    return lamportsToSol(lamports);
  } catch (error) {
    console.error('Error fetching SOL balance:', error);
    throw new Error(`Failed to fetch SOL balance: ${(error as Error).message}`);
  }
}

export async function getTokenBalances(
  walletAddress: string,
  tokens: TokensMap
): Promise<{ [tokenName: string]: { amount: number; mintAddress: string } }> {
  try {
    const publicKey = new PublicKey(walletAddress);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID
    });

    // Create a map to store token balances
    const tokenBalances: { [tokenName: string]: { amount: number; mintAddress: string } } = {};
    
    // Initialize all tokens with zero balance
    Object.entries(tokens).forEach(([tokenName, tokenInfo]) => {
      tokenBalances[tokenName] = { amount: 0, mintAddress: tokenInfo.mintAddress };
    });

    // Update balances for tokens found in the wallet
    tokenAccounts.value.forEach(({ account }) => {
      const tokenInfo = account.data.parsed.info;
      const mintAddress = tokenInfo.mint;
      
      // Find which token this belongs to
      Object.entries(tokens).forEach(([tokenName, info]) => {
        if (info.mintAddress === mintAddress) {
          tokenBalances[tokenName] = {
            amount: tokenInfo.tokenAmount.uiAmount || 0,
            mintAddress
          };
        }
      });
    });

    return tokenBalances;
  } catch (error) {
    console.error('Error fetching token balances:', error);
    throw new Error(`Failed to fetch token balances: ${(error as Error).message}`);
  }
}

export async function getWalletBalances(walletAddress: string): Promise<WalletBalance> {
  // Define tokens to check
  const tokens: TokensMap = {
    bonk: { mintAddress: config.tokens.bonk.mintAddress }
  };

  // Get SOL balance
  const solBalance = await getSolBalance(walletAddress);
  
  // Get token balances
  const tokenBalances = await getTokenBalances(walletAddress, tokens);

  return {
    solBalance,
    tokenBalances
  };
}