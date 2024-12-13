'use client'
// import "./globals.css";
import Home from "./page"
import App1 from "./test"


import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFullnodeUrl } from '@mysten/sui/client';

// 初始化 QueryClient 和网络配置
const queryClient = new QueryClient();
const networks = {
    devnet: { url: getFullnodeUrl('devnet') },
    mainnet: { url: getFullnodeUrl('mainnet') },
    testnet: { url: getFullnodeUrl('testnet') },
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
      <Home/>
      </body>
    </html>
  );
}
