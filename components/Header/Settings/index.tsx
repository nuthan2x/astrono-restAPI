import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";
import cn from "classnames";
import styles from "./Settings.module.sass";
import NavLink from "../../NavLink";
import Icon from "../../Icon";
import Image from "../../Image";
import Theme from "../../Theme";
import {useSigner, useAccount} from 'wagmi';
import axios from 'axios';
import { useState, useEffect } from "react";

type LinksType = {
    title: string;
    icon: string;
    divider?: boolean;
    url: string;
};

type SettingsProps = {
    className?: string;
    items: LinksType[];
};

const Settings = ({ items, className }: SettingsProps) => {
    const { address, isConnecting, isDisconnected } = useAccount()

    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [isprevData, setisprevData] = useState(false)

   

    useEffect(() => {
        getdata()
      }, [])
  
      useEffect(() => {
        getdata()
      }, [address])
      
      useEffect(() => {
          setName('')
          setUsername('') 
      }, [isDisconnected])
      
    
      const getdata = () => {
        axios.get(`https://necessary-gleaming-foxglove.glitch.me/users/${address}`)
        .then(res => {
            console.log('get_success', res.data)
            setName(res.data.displayname)
            setUsername(`@${res.data.username}`)
     
            res.status === 200 && setisprevData(true)
        }) 
        .catch(err => {
            console.log(err)
            setName('')
            setUsername('') 
        })
    }

    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            <div
                className={cn(styles.settings, className, {
                    [styles.active]: visible,
                })}
            >
                <button
                    className={cn(styles.head, styles.active)}
                    onClick={() => setVisible(!visible)}
                >
                    <Image
                        src="/images/content/avatars/avatar-7.png"
                        width={32}
                        height={32}
                        alt="Avatar"
                    />
                </button>
                <div className={styles.body}>
                    <Link href="/user-profile">
                        <a className={styles.top}>
                            <div className={styles.details}>
                                <div className={cn("title", styles.user)}>
                                   {(isprevData && address) ? name : 'My name'}
                                </div>
                                <div className={styles.login}>{(isprevData && address) ? username : '@my_username'}</div>
                            </div>
                            <div className={styles.arrow}>
                                <Icon name="arrow-next" />
                            </div>
                        </a>
                    </Link>
                    <div className={styles.list}>
                        {items.map((x, index) => (
                            <NavLink
                                className={cn(styles.link, {
                                    [styles.divider]: x.divider,
                                })}
                                activeClassName={styles.active}
                                href={x.url}
                                onClick={() => setVisible(!visible)}
                                key={index}
                            >
                                <div className={styles.icon}>
                                    <Icon name={x.icon} />
                                </div>
                                {x.title}
                                <div className={styles.arrow}>
                                    <Icon name="arrow-next" />
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className={styles.control}>
                        <Theme className={styles.theme} />
                        <Link href="/welcome">
                            <a className={cn("button-sm", styles.button)}>
                                <span>Play game</span>
                                <Icon name="arrow-right" size="16" />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default Settings;
