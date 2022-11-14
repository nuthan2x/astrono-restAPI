import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./PageSettings.module.sass";
import Checkbox from "../Checkbox";
import Input from "../Input";
import Field from "../Input/Field";
import Theme from "../Theme";
import JoinCommunity from "../JoinCommunity";
import {useSigner, useAccount} from 'wagmi';
import axios from 'axios';

type PageSettingsProps = {
    className?: string;
};

const PageSettings = ({ className }: PageSettingsProps) => {
    const { address, isConnecting, isDisconnected } = useAccount()

    const [email, setEmail] = useState("");
    const [checkListings, setCheckListings] = useState<boolean>(true);
    const [checkPurchase, setCheckPurchase] = useState<boolean>(true);
    const [checkNotifications, setCheckNotifications] = useState<boolean>(true);
    const [checkIngame, setCheckIngame] = useState<boolean>(true);
    const [isprevData, setisprevData] = useState(false)

    const [updateData, setupdateData] = useState({ 
        email : ''
    })
    const [settingssaved, setsettingssaved] = useState(false)


    useEffect(() => {
        getdata()
    }, [])
    

    useEffect(() => {
        getdata()
    }, [address])
    
    useEffect(() => {
        setEmail('')
    }, [isDisconnected])
    
    useEffect(() => {
          
        setupdateData(prev => {return {
          ...prev, 
          email : email,
          checkListings : checkListings,
          checkPurchase : checkPurchase,
          checkNotifications : checkNotifications,
          checkIngame : checkIngame
      }})
    }, [ email, checkListings, checkPurchase, checkNotifications, checkIngame])

    const getdata = () => {
        axios.get(`https://necessary-gleaming-foxglove.glitch.me/users/${address}`)
        .then(res => {
            console.log('get_success', res.data)
            setEmail(res.data.email)
            setCheckListings(res.data.checkListings)
            setCheckPurchase(res.data.checkPurchase)
            setCheckNotifications(res.data.checkNotifications)
            setCheckIngame(res.data.checkIngame)
            setupdateData(res.data)
            res.status === 200 && setisprevData(true)
        }) 
        .catch(err => {
            console.log(err)
            setEmail('')
        })
    }

    const postData = async  () => {
    
        
        if(isprevData) {
            
            console.log('put updateData: ', updateData);
            axios.put(`https://necessary-gleaming-foxglove.glitch.me/users/${address}`, updateData)
            .then(res => {
                console.log('put_success', res.data)
                res.status == 200 && setsettingssaved(true)
                setTimeout(() => {
                   setsettingssaved(false) 
                }, 5000);
            }) 
            .catch(err => console.log(err))
        } else {
            console.log('post updateData: ', updateData);
            axios.post('https://necessary-gleaming-foxglove.glitch.me/users', updateData)
            .then(res => {
                console.log('post_success', res.data)
                res.status == 200 && setsettingssaved(true)
                setTimeout( () => {
                    setsettingssaved(false) 
                }, 5000);
            }) 
            .catch(err => console.log(err))
        }
    }

    return (
        <>
            <div className={cn("section-main", styles.section)}>
                <div className={cn("container-xxs", styles.container)}>
                    <h1 className={cn("h1", styles.title)}>Settings</h1>

                    <Field label="Email  address" className={styles.field} large>
                        <Input
                            className={styles.username_input}
                            value={email}
                            onChange={setEmail}
                            placeholder="Email address"
                            arobase
                        />
                    </Field>

                    <Field label="Default  mode" className={styles.field} large>
                        <Theme className={styles.theme} large />
                    </Field>

                    <Field label="Notifications" className={styles.field} large>
                        <div className={styles.notify}>
                            <Checkbox
                                value={checkListings}
                                setValue={setCheckListings}
                                className={styles.checkbox}
                                large
                            />
                            <div className={styles.details}>
                                <div className={styles.notify_title}>
                                    New item listings
                                </div>
                                <div className={styles.info}>
                                    turn on notifications to get  mailed when a new item is listed for sale in marketplace.
                                </div>
                            </div>
                        </div>

                        <div className={styles.notify}>
                            <Checkbox
                                value={checkPurchase}
                                setValue={setCheckPurchase}
                                className={styles.checkbox}
                                large
                            />
                            <div className={styles.details}>
                                <div className={styles.notify_title}>
                                    Purchase notifications
                                </div>
                                <div className={styles.info}>
                                    get mails on all purchased info, sold info of your nfts.
                                </div>
                            </div>
                        </div>

                        <div className={styles.notify}>
                            <Checkbox
                                value={checkNotifications}
                                setValue={setCheckNotifications}
                                className={styles.checkbox}
                                large
                            />
                            <div className={styles.details}>
                                <div className={styles.notify_title}>
                                    Notifications
                                </div>
                                <div className={styles.info}>
                                    turns on all notifications on updates of features, marketplace and announcements info. 
                                </div>
                            </div>
                        </div>

                        <div className={styles.notify}>
                            <Checkbox
                                value={checkIngame}
                                setValue={setCheckIngame}
                                className={styles.checkbox}
                                large
                            />
                            <div className={styles.details}>
                                <div className={styles.notify_title}>
                                    Ingame notifications
                                </div>
                                <div className={styles.info}>
                                    get all the in-game notifications to my email.
                                </div>
                            </div>
                        </div>


                        {/* <div className={styles.notify}>
                            <Checkbox
                                value={checkIngame}
                                setValue={setCheckIngame}
                                className={styles.checkbox}
                                large
                            />
                            <div className={styles.details}>
                                <div className={styles.notify_title}>
                                    Ingame notifications
                                </div>
                                <div className={styles.info}>
                                    Est architecto quasi exercitationem et non.
                                    Qui qui aliquid tempore perspiciatis ea vero
                                    ut. Repellat cupiditate hic autem. Non ipsam
                                    sunt odit. Qui voluptates maiores est.
                                </div>
                            </div>
                        </div> */}

                    </Field>

                    <button className={cn("button", styles.save)} onClick={postData}>
                        {settingssaved ? 'Saved' : 'Save settings'}
                    </button>
                </div>
            </div>
            <JoinCommunity />
        </>
    );
};

export default PageSettings;
