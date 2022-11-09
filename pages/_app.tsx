// @ts-nocheck
import type { AppProps } from "next/app";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-247622932-1');
import "../styles/app.sass";

import '@rainbow-me/rainbowkit/styles.css';
import {
  Chain, connectorsForWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const ZenithMainnet: Chain = {
  id: 79,
  name: 'Zenith Mainnet',
  network: 'Zenith Mainnet',
  iconUrl: 'https://gateway.pinata.cloud/ipfs/QmPeoRP6idgGmYr7LptKBF3Ugst6Rzti71ADAJSmmqQT4K',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'ZENITH',
    symbol: 'ZENITH',
  },
  rpcUrls: {
    default: 'https://dataserver-us-1.zenithchain.co/	',
  },
  blockExplorers: {
    default: { name: 'zenithchain', url: 'https://scan.zenithchain.co/' },
    etherscan: { name: 'zenithchain', url: 'https://scan.zenithchain.co/' },
  },
  testnet: false,
};

const bscMainnet: Chain = {
  id: 56,
  name: 'Binance Smart Chain Mainnet',
  network: 'Binance Smart Chain Mainnet',
  iconUrl: 'https://ipfs.io/ipfs/QmY23eEYQnVUoTUUTnX3aQd9tVv9eQRcoPvpNG7eUDxjGU',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed1.ninicoin.io',
  },
  blockExplorers: {
    default: { name: 'bscscan', url: 'https://bscscan.com' },
    etherscan: { name: 'bscscan', url: 'https://bscscan.com' },
  },
  testnet: false,
};
const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, bscMainnet, ZenithMainnet],
    [
      publicProvider(),
      jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })
    ]
  );
  import {
    injectedWallet,
    rainbowWallet,
    metaMaskWallet,
    coinbaseWallet,
    walletConnectWallet,
    trustWallet,
    braveWallet,
    argentWallet,
    ledgerWallet
  } from '@rainbow-me/rainbowkit/wallets';
  
  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({ chains }),
        coinbaseWallet({ chains, appName: 'AstronoClash' }),
        walletConnectWallet({ chains }),
    ],
},
{
    groupName: 'Others',
    wallets: [
        trustWallet({ chains }),
        braveWallet({ chains }),
        ledgerWallet({chains}),
        argentWallet({ chains }),
        rainbowWallet({ chains }),
      ],
    },
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })



  
function MyApp({ Component, pageProps }: AppProps) {
    return (
        
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains} >
                  <Component {...pageProps} />
                </RainbowKitProvider>
            </WagmiConfig>
            
        
    );

}

export default MyApp;



