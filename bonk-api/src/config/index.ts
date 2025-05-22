import dotenv from 'dotenv';
import { ClusterType } from '../types';

dotenv.config();

export const config = {
  port: process.env.PORT,
  solana: {
    cluster: (process.env.SOLANA_CLUSTER || 'mainnet-beta') as ClusterType,
    commitment: process.env.SOLANA_COMMITMENT || 'confirmed',
    rpcUrl: `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` 
  },
  tokens: {
    bonk: {
      mintAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
    }
  }
};