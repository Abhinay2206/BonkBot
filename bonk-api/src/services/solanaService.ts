import { Connection, PublicKey, clusterApiUrl, ParsedTransactionWithMeta, ParsedMessageAccount } from '@solana/web3.js';
import { config } from '../config';
import { WalletBalance, TokenInfoData, TokensMap, TransactionInfo } from '../types';
import { lamportsToSol } from '../utils';

const connection = new Connection(
  config.solana.rpcUrl, 
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

export async function getAllTokenHoldings(walletAddress: string): Promise<{ mintAddress: string; amount: number; symbol?: string; name?: string; decimals?: number }[]> {
  try {
    const publicKey = new PublicKey(walletAddress);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });

    const holdings = await Promise.all(
      tokenAccounts.value
        .filter(({ account }) => account.data.parsed.info.tokenAmount?.uiAmount > 0)
        .map(async ({ account }) => {
          const mintAddress = account.data.parsed.info.mint;
          const amount = account.data.parsed.info.tokenAmount?.uiAmount || 0;

          try {
            const tokenInfo = await connection.getParsedAccountInfo(new PublicKey(mintAddress));
            const metadata = tokenInfo.value?.data as any;

            return {
              mintAddress,
              amount,
              symbol: metadata?.parsed?.info?.symbol,
              name: metadata?.parsed?.info?.name,
              decimals: metadata?.parsed?.info?.decimals
            };
          } catch (err) {
            // Return basic info if metadata fetch fails
            return {
              mintAddress,
              amount
            };
          }
        })
    );

    return holdings;

  } catch (error) {
    console.error("❌ Error fetching token holdings:", error);
    throw new Error(`Failed to fetch all token holdings: ${(error as Error).message}`);
  }
}

export async function getRecentTransactions(walletAddress: string, limit: number = 10): Promise<TransactionInfo[]> {
  try {
    const publicKey = new PublicKey(walletAddress);
    
    // Get recent transactions
    const signatures = await connection.getSignaturesForAddress(publicKey, {
      limit,
    });

    // Get transaction details
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        const tx = await connection.getParsedTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0,
        });
        
        if (!tx) return null;

        const transactionInfo: TransactionInfo = {
          signature: sig.signature,
          type: 'Unknown',
          time: new Date(sig.blockTime ? sig.blockTime * 1000 : Date.now()).toISOString(),
        };

        // Try to determine transaction type and details
        if (tx.meta && tx.transaction.message.accountKeys) {
          const preBalances = tx.meta.preBalances;
          const postBalances = tx.meta.postBalances;
          const accountKeys = tx.transaction.message.accountKeys.map((key: ParsedMessageAccount) => key.pubkey.toString());
          const walletIndex = accountKeys.indexOf(walletAddress);

          // Check if it's a SOL transfer
          if (tx.meta.preBalances[walletIndex] !== tx.meta.postBalances[walletIndex]) {
            transactionInfo.type = 'Transfer';
            transactionInfo.token = 'SOL';
            transactionInfo.amount = Math.abs(lamportsToSol(postBalances[walletIndex] - preBalances[walletIndex]));
          }

          // Check SPL Token transfers
          const tokenTransfers = tx.meta.postTokenBalances?.map(post => {
            const pre = tx.meta?.preTokenBalances?.find(pre => pre.accountIndex === post.accountIndex);
            if (!pre) return null;
            return {
              mint: post.mint,
              preAmount: Number(pre.uiTokenAmount.uiAmount || 0),
              postAmount: Number(post.uiTokenAmount.uiAmount || 0),
              accountIndex: post.accountIndex
            };
          }).filter(Boolean);

          if (tokenTransfers?.length) {
            const transfer = tokenTransfers[0];
            if (transfer) {
              transactionInfo.type = 'Transfer';
              transactionInfo.token = transfer.mint;
              transactionInfo.amount = Math.abs(transfer.postAmount - transfer.preAmount);
            }
          }

          // Extract addresses for transfers
          const instructions = tx.transaction.message.instructions;
          if (instructions.length > 0) {
            const instruction = instructions[0];
            if ('parsed' in instruction) {
              const { type, info } = instruction.parsed;
              if (type === 'transfer' && info) {
                transactionInfo.fromAddress = info.source;
                transactionInfo.toAddress = info.destination;
              }
            }
          }
        }

        return transactionInfo;
      })
    );

    return transactions.filter((tx): tx is TransactionInfo => tx !== null);
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    throw new Error(`Failed to fetch recent transactions: ${(error as Error).message}`);
  }
}

