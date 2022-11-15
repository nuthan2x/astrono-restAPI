import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";
import cn from "classnames";
import styles from "./Wallet.module.sass";
import Icon from "../../Icon";
import Image from "../../Image";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useSigner, useAccount} from 'wagmi';

import { formatWalletAddress } from "../../../utils";

type NotificationProps = {
    className?: string;
    wide?: boolean;
};

const Notification = ({ className, wide }: NotificationProps) => {
    const { address, isConnecting, isDisconnected } = useAccount()

    const [visible, setVisible] = useState(false);
    const wallet: string = `${address}`;

   
    return (
        <OutsideClickHandler onOutsideClick={() => !wide && setVisible(false)}>
            <div
                className={cn(styles.wallet, className, {
                    [styles.active]: visible,
                    [styles.wide]: wide,
                })}
            >
                <button
                    className={cn(styles.head, styles.active, {
                        [styles.wide]: wide,
                    })}
                    onClick={() => setVisible(!visible)}
                >
                    <div className={styles.avatar}>
                        <Image
                            src="/images/content/avatars/fox.svg"
                            width={20}
                            height={20}
                            alt="Avatar"
                        />
                    </div>
                    <div className={styles.code}>
                        {address ? wide
                            ? formatWalletAddress(wallet, 10, 10)
                            : formatWalletAddress(wallet, 7, 7) : 'connect wallet'}
                    </div>
                </button>
                <div
                    className={cn(styles.body, {
                        [styles.wide]: wide,
                    })}
                >
                    {address && <div className={styles.label}>Connected</div>}
                    <div className={styles.line}>
                        <div className={styles.code}>
                            {address ? formatWalletAddress(wallet, 10, 10) :  'connect'}
                        </div>
                        {address && 
                            <button className={styles.copy}
                                onClick={() =>  navigator.clipboard.writeText(`${address}`)}
                            >
                                <Icon name="copy" size="20" />
                            </button>
                        }
                    </div>
                    {/* <button
                        className={cn(
                            "button-stroke button-sm",
                            styles.disconnectButton
                        )}
                    > */}
                        <div className={styles.connectButton}>
                            <ConnectButton chainStatus="icon" showBalance={false}/>
                        </div >
                    {/* </button> */}
                    <div className={styles.link}>
                        <a href={`https://blockscan.com/address/${address}`} target="_blank" rel="noreferrer">
                            View on explorer
                            <Icon name="external-link" size="16" />
                        </a>
                    </div>
                    {/* <div className={styles.foot}>
                        <div className={styles.balance}>
                            <div className={styles.currency}>
                                <Image
                                    src="/images/content/etherium.svg"
                                    width={40}
                                    height={40}
                                    alt="Etherium"
                                />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.label}>Balance</div>
                                <div className={cn("h6", styles.price)}>
                                    1.5836
                                </div>
                            </div>
                        </div>
                        <button className={cn("button-md", styles.button)}>
                            Withdraw
                        </button>
                    </div> */}
              
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default Notification;


{/* <div className="mt-4">
          <button
            onClick={() => handleNetworkSwitch("polygon")}
            className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Switch to Polygon
          </button>
          <button
            onClick={() => handleNetworkSwitch("bsc")}
            className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
          >
            Switch to BSC
          </button>
          <button
            onClick={() => handleNetworkSwitch("ZenithMainnet")}
            className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
          >
            Switch to ZenithMainnet
          </button>
                </div> */}


                 
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
//       name: "BNB",
//       symbol: "BNB",
//       decimals: 18
//     },
//     rpcUrls: [
//       "https://bsc-dataseed1.ninicoin.io"
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


//   // useEffect(() => {
//   //   window.ethereum.on("chainChanged", networkChanged);

//   //   return () => {
//   //     window.ethereum.removeListener("chainChanged", networkChanged);
//   //   };
//   // }, []);

