
import express, { Application, Request, Response, NextFunction } from 'express';
import walletRoutes from './routes/walletRoutes';
import tradingRoutes from './routes/tradingRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Create Express app
const app: Application = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Routes
app.use('/api/wallet', walletRoutes);
app.use('/api/trading', tradingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'up', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Solana Balance Checker API',
    endpoints: {
      balance: '/api/wallet/balance/:wallet - Get SOL and token balances for a wallet',
      trading: {
        marketOrder: '/api/trading/market-order - Execute a market order',
        limitOrder: '/api/trading/limit-order - Place a limit order', 
        dca: '/api/trading/dca - Setup DCA order',
        alerts: '/api/trading/check-alerts - Check price alerts',
      },
      user: {
        update: '/api/user/update - Update user information',
        delete: '/api/user/delete - Delete user account',
        get: '/api/user/get - Get user information',
        getByEmail: '/api/user/getByEmail - Get user by email',
      },
    }
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

export default app;