import React, { createContext, useState, useContext } from 'react';

interface WalletContextType {
  walletType: string | null;
  publicKey: string | null;
  setWalletInfo: (walletType: string, publicKey: string) => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletType, setWalletType] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const setWalletInfo = (type: string, key: string) => {
    setWalletType(type);
    setPublicKey(key);
  };

  const disconnect = () => {
    setWalletType(null);
    setPublicKey(null);
  };

  return (
    <WalletContext.Provider value={{ walletType, publicKey, setWalletInfo, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
