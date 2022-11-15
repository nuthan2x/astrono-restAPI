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
  iconUrl: 'https://gateway.pinata.cloud/ipfs/QmY23eEYQnVUoTUUTnX3aQd9tVv9eQRcoPvpNG7eUDxjGU',
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



// <div className="mt-4">
//           <button
//             onClick={() => handleNetworkSwitch("polygon")}
//             className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
//           >
//             Switch to Polygon
//           </button>
//           <button
//             onClick={() => handleNetworkSwitch("bsc")}
//             className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
//           >
//             Switch to BSC
//           </button>
//           <button
//             onClick={() => handleNetworkSwitch("ZenithMainnet")}
//             className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
//           >
//             Switch to ZenithMainnet
//           </button>
//                 </div>


// const networks = {
//   polygon: {
//     chainId: `0x${Number(137).toString(16)}`,
//     chainName: "Polygon Mainnet",
//     nativeCurrency: {
//       name: "MATIC",
//       symbol: "MATIC",
//       decimals: 18
//     },
//     rpcUrls: ["https://polygon-rpc.com/"],
//     blockExplorerUrls: ["https://polygonscan.com/"]
//   },
//   ZenithMainnet: {
//     chainId: `0x${Number(79).toString(16)}`,
//     chainName: "Zenith Mainnet",
//     nativeCurrency: {
//       name: "ZENITH",
//       symbol: "ZENITH",
//       decimals: 18
//     },
//     rpcUrls: ["https://dataserver-us-1.zenithchain.co/"],
//     blockExplorerUrls: ["https://scan.zenithchain.co/"]
//   },
//   bsc: {
//     chainId: `0x${Number(56).toString(16)}`,
//     chainName: "Binance Smart Chain Mainnet",
//     nativeCurrency: {
//       name: "Binance Chain Native Token",
//       symbol: "BNB",
//       decimals: 18
//     },
//     rpcUrls: [
//       "https://bsc-dataseed1.binance.org",
//       "https://bsc-dataseed2.binance.org",
//       "https://bsc-dataseed3.binance.org",
//       "https://bsc-dataseed4.binance.org",
//       "https://bsc-dataseed1.defibit.io",
//       "https://bsc-dataseed2.defibit.io",
//       "https://bsc-dataseed3.defibit.io",
//       "https://bsc-dataseed4.defibit.io",
//       "https://bsc-dataseed1.ninicoin.io",
//       "https://bsc-dataseed2.ninicoin.io",
//       "https://bsc-dataseed3.ninicoin.io",
//       "https://bsc-dataseed4.ninicoin.io",
//       "wss://bsc-ws-node.nariox.org",
//       "https://bsc-dataseed4.ninicoin.io"
//     ],
//     blockExplorerUrls: ["https://bscscan.com"]
//   }
// };
// const changeNetwork = async ({ networkName }) => {
//   try {
//     if (!window.ethereum) throw new Error("No crypto wallet found");
//     await window.ethereum.request({
//       method: "wallet_addEthereumChain",
//       params: [
//         {
//           ...networks[networkName]
//         }
//       ]
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };


  

//   const handleNetworkSwitch = async (networkName) => {

//     await changeNetwork({ networkName });
//   };

//   const networkChanged = (chainId) => {
//     console.log({ chainId });
//   };

//   useEffect(() => {
//     window.ethereum.on("chainChanged", networkChanged);

//     return () => {
//       window.ethereum.removeListener("chainChanged", networkChanged);
//     };
//   }, []);