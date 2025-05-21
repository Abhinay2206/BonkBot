import React, { createContext, useState, useContext, useEffect } from 'react';

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

  useEffect(() => {
    const walletTypes = [
      'metamask',
      'phantom',
      'solflare',
      'sollet',
      'coinbase',
      'trustwallet'
    ];
    for (const type of walletTypes) {
      if (sessionStorage.getItem(`${type}Connected`) === 'true') {
        const key = sessionStorage.getItem(`${type}PublicKey`);
        if (key) {
          setWalletType(type);
          setPublicKey(key);
          break;
        }
      }
    }
  }, []);

  const setWalletInfo = (type: string, key: string) => {
    setWalletType(type);
    setPublicKey(key);
    sessionStorage.setItem(`${type}Connected`, 'true');
    sessionStorage.setItem(`${type}PublicKey`, key);
    [
      'metamask',
      'phantom',
      'solflare',
      'sollet',
      'coinbase',
      'trustwallet'
    ].forEach((t) => {
      if (t !== type) {
        sessionStorage.removeItem(`${t}Connected`);
        sessionStorage.removeItem(`${t}PublicKey`);
      }
    });
  };

  const disconnect = () => {
    if (walletType) {
      sessionStorage.removeItem(`${walletType}Connected`);
      sessionStorage.removeItem(`${walletType}PublicKey`);
    }
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
