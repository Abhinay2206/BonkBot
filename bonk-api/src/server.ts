import app from './app';
import { config } from './config';

const PORT = config.port;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Connected to Solana ${config.solana.cluster}`);
  console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default server;