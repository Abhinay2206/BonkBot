import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export async function createSwapTransaction(fromToken: string, toToken: string, amount: number, wallet: string) {
  const walletPubKey = new PublicKey(wallet);

  const fromTokenAccount = await getAssociatedTokenAddress(new PublicKey(fromToken), walletPubKey);
  const toTokenAccount = await getAssociatedTokenAddress(new PublicKey(toToken), walletPubKey);

  const transaction = new Transaction();

  if (fromToken.toLowerCase() === 'sol') {
    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: walletPubKey,
      toPubkey: toTokenAccount,
      lamports: amount * 1e9,
    });
    transaction.add(transferSolInstruction);
  } else {
    const transferInstruction = createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      walletPubKey,
      amount
    );
    transaction.add(transferInstruction);
  }

  transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  transaction.feePayer = walletPubKey;

  // Serialize unsigned transaction
  const serializedTransaction = transaction.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });

  return serializedTransaction.toString('base64');
}


export async function scheduleLimitOrder(order: {
  fromToken: string;
  toToken: string;
  amount: number;
  targetPrice: number;
  wallet: string;
}) {
  try {
    console.log('Scheduled limit order:', order);
  } catch (error) {
    console.error('Limit order error:', error);
    throw new Error(`Failed to schedule limit order: ${(error as Error).message}`);
  }
}

export async function scheduleDCAOrder(order: {
  interval: string;
  fromToken: string;
  toToken: string;
  amount: number;
  wallet: string;
}) {
  try {
    console.log('Scheduled DCA order:', order);
  } catch (error) {
    console.error('DCA order error:', error);
    throw new Error(`Failed to schedule DCA order: ${(error as Error).message}`);
  }
}

export async function getCurrentPrice(token: string): Promise<number> {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as { [key: string]: { usd: number } };
    if (!data[token]?.usd) {
      throw new Error(`Price not found for token: ${token}`);
    }
    return data[token].usd;
  } catch (error) {
    console.error('Price fetch error:', error);
    throw new Error(`Failed to get current price: ${(error as Error).message}`);
  }
}

export async function getTriggeredAlerts() {
  try {
    return [{ token: 'BONK', target: 0.00002, current: 0.000021 }];
  } catch (error) {
    console.error('Alert check error:', error);
    throw new Error(`Failed to check price alerts: ${(error as Error).message}`);
  }
}