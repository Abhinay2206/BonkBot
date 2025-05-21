import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom?: boolean;
        connect(): Promise<{ publicKey: { toString(): string } }>;
      };
    };
    ethereum?: {
      request(args: { method: string }): Promise<string[]>;
    };
    solflare?: {
      isSolflare?: boolean;
      connect(): Promise<{ publicKey: { toString(): string } }>;
    };
    sollet?: {
      isSollet?: boolean;
      connect(): Promise<{ publicKey: { toString(): string } }>;
    };
    coinbase?: {
      isCoinbaseWallet?: boolean;
      request(args: { method: string }): Promise<string[]>;
    };
    trustwallet?: {
      isTrust?: boolean;
      request(args: { method: string }): Promise<string[]>;
    };
  }
}

const WalletPopup = () => {
  const navigate = useNavigate();
  const [availableWallets, setAvailableWallets] = useState({
    phantom: false,
    metamask: false,
    solflare: false,
    sollet: false,
    coinbase: false,
    trustwallet: false
  });
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setAvailableWallets({
      phantom: !!window.phantom?.solana?.isPhantom,
      metamask: !!window.ethereum,
      solflare: !!window.solflare?.isSolflare,
      sollet: !!window.sollet?.isSollet,
      coinbase: !!window.coinbase?.isCoinbaseWallet,
      trustwallet: !!window.trustwallet?.isTrust
    });
  }, []);

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true);
    try {
      switch(walletType) {
        case 'metamask':
          if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts && accounts[0]) {
              sessionStorage.setItem('metamaskConnected', 'true');
              sessionStorage.setItem('metamaskPublicKey', accounts[0]);
              navigate('/dashboard');
            }
          }
          break;

        case 'phantom':
          { const solana = window.phantom?.solana;
          if (solana?.isPhantom) {
            const response = await solana.connect();
            const publicKey = response.publicKey.toString();
            if (publicKey) {
              sessionStorage.setItem('phantomPublicKey', publicKey);
              sessionStorage.setItem('phantomConnected', 'true');
              navigate('/dashboard');
            }
          }
          break; }

        case 'solflare':
          if (window.solflare) {
            const response = await window.solflare.connect();
            const publicKey = response.publicKey.toString();
            if (publicKey) {
              sessionStorage.setItem('solflarePublicKey', publicKey);
              sessionStorage.setItem('solflareConnected', 'true');
              navigate('/dashboard');
            }
          }
          break;

        case 'sollet':
          if (window.sollet) {
            const response = await window.sollet.connect();
            const publicKey = response.publicKey.toString();
            if (publicKey) {
              sessionStorage.setItem('solletPublicKey', publicKey);
              sessionStorage.setItem('solletConnected', 'true');
              navigate('/dashboard');
            }
          }
          break;

        case 'coinbase':
          if (window.coinbase) {
            const accounts = await window.coinbase.request({ method: 'eth_requestAccounts' });
            if (accounts && accounts[0]) {
              sessionStorage.setItem('coinbaseConnected', 'true');
              sessionStorage.setItem('coinbasePublicKey', accounts[0]);
              navigate('/dashboard');
            }
          }
          break;

        case 'trustwallet':
          if (window.trustwallet) {
            const accounts = await window.trustwallet.request({ method: 'eth_requestAccounts' });
            if (accounts && accounts[0]) {
              sessionStorage.setItem('trustwalletConnected', 'true');
              sessionStorage.setItem('trustwalletPublicKey', accounts[0]);
              navigate('/dashboard');
            }
          }
          break;
      }
    } catch (err) {
      console.error(`${walletType} connection rejected`, err);
    } finally {
      setIsConnecting(false);
    }
  };

  const walletConfigs = [
    {
      id: 'phantom',
      name: 'Phantom',
      network: 'Solana Network',
      icon: '/assets/images/phantom-icon.png',
      installUrl: 'https://phantom.app/'
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      network: 'Ethereum Network',
      icon: '/assets/images/metamask-icon.png',
      installUrl: 'https://metamask.io/'
    },
    {
      id: 'solflare',
      name: 'Solflare',
      network: 'Solana Network',
      icon: '/assets/images/solflare-icon.png',
      installUrl: 'https://solflare.com/'
    },
    {
      id: 'sollet',
      name: 'Sollet',
      network: 'Solana Network',
      icon: '/assets/images/sollet-icon.png',
      installUrl: 'https://www.sollet.io/'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      network: 'Multi-Chain',
      icon: '/assets/images/coinbase-icon.png',
      installUrl: 'https://www.coinbase.com/wallet'
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      network: 'Multi-Chain',
      icon: '/assets/images/trustwallet-icon.png',
      installUrl: 'https://trustwallet.com/'
    }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-96 border border-purple-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Available Wallets</h2>
        
        <div className="space-y-4">
          {walletConfigs.map((wallet) => (
            availableWallets[wallet.id as keyof typeof availableWallets] ? (
              <button
                key={wallet.id}
                onClick={() => connectWallet(wallet.id)}
                disabled={isConnecting}
                className={`w-full p-4 bg-white dark:bg-gray-700 border border-purple-200 dark:border-gray-600 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-3 ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {isConnecting ? `Connecting to ${wallet.name}...` : wallet.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Connect to {wallet.network}</div>
                </div>
              </button>
            ) : (
              <a
                key={wallet.id}
                href={wallet.installUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center gap-3 cursor-pointer opacity-60"
              >
                <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 grayscale" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Install {wallet.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{wallet.name} not detected</div>
                </div>
              </a>
            )
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          disabled={isConnecting}
          className={`mt-6 w-full p-3 text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WalletPopup;
