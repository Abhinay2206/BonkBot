import { PublicKey } from '@solana/web3.js';

export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
}

export function lamportsToSol(lamports: number): number {
  return lamports / 1_000_000_000; // 1 SOL = 1e9 lamports
}