import { TokenInfo } from "@solana/spl-token-registry";

// Type for Solana cluster options
export type ClusterType = 'mainnet-beta' | 'testnet' | 'devnet';

// Type for wallet balance response
export interface WalletBalance {
  solBalance: number;
  tokenBalances: {
    [tokenName: string]: {
      amount: number;
      mintAddress: string;
    };
  };
}

// Type for transaction info
export interface TransactionInfo {
  signature: string;
  type: 'Unknown' | 'Transfer' | 'Swap' | 'Stake';
  time: string;
  token?: string;
  amount?: number;
  value?: number;
  fromAddress?: string;
  toAddress?: string;
}

// Type for token info
export interface TokenInfoData {
  mintAddress: string;
  decimals?: number;
  name?: string;
  symbol?: string;
}

// Type for tokens map
export interface TokensMap {
  [tokenName: string]: TokenInfoData;
}