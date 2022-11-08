import React, { useState } from "react";
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
    const wallet: string = `${address}` ;

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
                            {address ? formatWalletAddress(wallet, 10, 10) :  'connecting'}
                        </div>
                        <button className={styles.copy}>
                            <Icon name="copy" size="20" />
                        </button>
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
