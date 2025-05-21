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

// Type for token info
export interface TokenInfo {
  mintAddress: string;
  decimals?: number;
  name?: string;
  symbol?: string;
}

// Type for tokens map
export interface TokensMap {
  [tokenName: string]: TokenInfo;
}