import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Main.module.sass";
import Cover from "../../Profile/Cover";
import Icon from "../../Icon";
import Image from "../../Image";
import Tooltip from "rc-tooltip";
import ModalChangeAvatar from "../../ModalChangeAvatar";
import {useSigner, useAccount} from 'wagmi';
import axios from 'axios';

import { formatWalletAddress } from "../../../utils";
import ModalShareProfile from "../../ModalShareProfile";

type MainProps = {};

const Main = ({}: MainProps) => {
    const { address, isConnecting, isDisconnected } = useAccount()

    const [modalShare, setModalShare] = useState<boolean>(false);
    const [modalAvatar, setModalAvatar] = useState<boolean>(false);
    const [upload, setUpload] = useState<boolean>(false);
    const [file, setFile] = useState<string>("");

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [twitter, settwitter] = useState('');
    const [instagram, setinstagram] = useState('')
    const [coverimageIPFS, setcoverimageIPFS] = useState('')
    const [avatarIPFS, setavatarIPFS] = useState('')
    const [avatar, setAvatar] = useState<string>("");
    const [isprevData, setisprevData] = useState(false)
    const [updateData, setupdateData] = useState({ 
        id : address,
        displayname : '',
        username : '',
        twitter : '',
        instagram : '',
        coverimage : '',
        avatarimage : ''
    })


    useEffect(() => {
        getdata()
      }, [])
  
      useEffect(() => {
        getdata()
      }, [address])
      
      useEffect(() => {
          setName('')
          setUsername('') 
          settwitter('')
          setinstagram('')
          setFile('')
          setAvatar('')
          setcoverimageIPFS('')
          setavatarIPFS('')
      }, [isDisconnected])

    const getdata = () => {
        axios.get(`${process.env.REACT_APP_RESTAPI_JSON_SERVER}/users/${address}`)
        .then(res => {
            console.log('get_success', res.data)
            setName(res.data.displayname)
            setUsername(res.data.username)
            settwitter(res.data.twitter)
            setinstagram(res.data.instagram)
            setcoverimageIPFS(res.data.coverimage)
            setavatarIPFS(res.data.avatarimage)
            res.status === 200 && setisprevData(true)
        }) 
        .catch(err => {
            console.log(err)
            setName('')
            setUsername('') 
            settwitter('')
            setinstagram('')
            setFile('')
            setAvatar('')
            setcoverimageIPFS('')
            setavatarIPFS('')
        })
    }

    return (
        <div className={cn("container-lg", styles.container)}>
            <div className={styles.wrapper}>
                 {(isprevData && !address) ? <Cover
                    upload={upload}
                    setUpload={setUpload}
                    value={file}
                    onChange={setFile}
                    cover= "/images/content/profile-cover.png"
                />
                 : <img src= {(isprevData && coverimageIPFS )? `https://gateway.pinata.cloud/ipfs/${coverimageIPFS}` : "/images/content/profile-cover.png"}  alt="cover image"  className={styles.coverimg}/>}
                 {/* {address == undefined && 
                   <Cover
                    upload={upload}
                    setUpload={setUpload}
                    value={file}
                    onChange={setFile}
                    cover= "/images/content/profile-cover.png"
                   />
                 } */}
                
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        {/* <div
                            className={styles.upload}
                            onClick={() => setModalAvatar(true)}
                        >
                            <Tooltip overlay="Change avatar">
                                <div>
                                    <Icon name="camera" size={32} />
                                </div>
                            </Tooltip>
                        </div>

                        <ModalChangeAvatar
                            visibleModal={modalAvatar}
                            setVisibleModal={() => setModalAvatar(false)}
                        /> */}

                        {(isprevData && !address) ? <Image
                            src= "/images/content/avatar.png"
                            width={142}
                            height={142}
                            alt="avatar img"
                        /> 
                        : <img src= {(isprevData && avatarIPFS) ? `https://gateway.pinata.cloud/ipfs/${avatarIPFS}` : "/images/content/avatar.png"} alt="" className={styles.avatarimg}/>}
                        
                        {/* {address == undefined && 
                          <Image
                            src= "/images/content/avatar.png"
                            width={142}
                            height={142}
                            alt="avatar img"
                        /> 
                        }
                     */}
                    </div>
                    <div className={styles.details}>
                        <div className={cn("h5", styles.name)}>{(address && isprevData) ? name : 'my Name'}</div>
                        {address &&<div className={styles.code}>
                             <div>{`${address?.slice(0,10)}............${address?.slice(32,42)}`}</div>
                            <button className={styles.copy} onClick={() => {navigator.clipboard.writeText(`${address}`)}} >
                                <Icon name="copy" size="20" />
                            </button>
                        </div>}
                    </div>

                    <button
                        className={cn("button-stroke button-sm", styles.share)}
                        onClick={() => setModalShare(true)}
                    >
                        <Icon name="share" size="16" />
                        Share profile
                    </button>
                    <ModalShareProfile
                        visibleModal={modalShare}
                        setVisibleModal={() => setModalShare(false)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Main;
