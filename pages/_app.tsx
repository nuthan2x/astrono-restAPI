import type { AppProps } from "next/app";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-247622932-1');
import "../styles/app.sass";

import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon ],
    [
      publicProvider()
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
                <RainbowKitProvider chains={chains}>
                  <Component {...pageProps} />
                </RainbowKitProvider>
            </WagmiConfig>
            
        
    );

}

export default MyApp;

