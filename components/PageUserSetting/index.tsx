import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./PageUserSetting.module.sass";
import Cover from "../Profile/Cover";
import Input from "../Input";
import Field from "../Input/Field";
import Image from "../Image";
import Icon from "../Icon";
import InputFile from "../InputFile";

import { formatWalletAddress } from "../../utils";
import {useSigner, useAccount} from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import axios from 'axios';
import {  FaInstagram, FaTwitter } from 'react-icons/fa';

const networks = [
    { title: "Connect twitter", icon: "twitter-stroke", connect: false },
    { title: "@jacebednar", icon: "instagram-stroke", connect: false },
];

type PageUserSettingProps = {};

const PageUserSetting = ({}: PageUserSettingProps) => {
    const [upload, setUpload] = useState<boolean>(false);
    const [file, setFile] = useState("");

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [twitter, settwitter] = useState('');
    const [instagram, setinstagram] = useState('')
    const [wallet, setWallet] = useState('');
    const [coverimageIPFS, setcoverimageIPFS] = useState('')
    const [avatarIPFS, setavatarIPFS] = useState('')
    const [avatar, setAvatar] = useState<string>("");
    const [avatarUploading, setavatarUploading] = useState(false)
    const [coverUploading, setcoverUploading] = useState(false)

    const { address, isConnecting, isDisconnected } = useAccount()
    
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
    const [settingssaved, setsettingssaved] = useState(false)

    const sendCoverFileToIPFS = async () => {

        if (file) {
            try { 
                const formData = new FormData();
                formData.append("file", file);
                setcoverUploading(true)

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': process.env.PINATA_API_KEY,
                        'pinata_secret_api_key': process.env.PINATA_API_SECRET,
                        "Content-Type": "image"
                    },
                });
                const ImgHash = resFile.data.IpfsHash;
                console.log('setcoverimageIPFS', ImgHash); 
                setcoverimageIPFS(ImgHash)
                setcoverUploading(false)

            } catch (error) {
                console.log("Error sending File to IPFS: ")
                console.log(error)
            }
        }
    }

    const sendAvatarFileToIPFS = async () => {

        if (avatar) {
            try { 
                const formData = new FormData();
                formData.append("file", avatar);
                setavatarUploading(true)

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': process.env.PINATA_API_KEY,
                        'pinata_secret_api_key': process.env.PINATA_API_SECRET,
                        "Content-Type": "image"
                    },
                });
                const ImgHash = resFile.data.IpfsHash;
                console.log('setavatarIPFS', ImgHash); 
                setavatarIPFS(ImgHash)
                setavatarUploading(false)


            } catch (error) {
                console.log("Error sending File to IPFS: ")
                console.log(error)
            }
        }
    }

    useEffect(() => {
      setWallet(`${address}`)
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
    

    useEffect(() => {
      setWallet(`${address}`)
        
      setupdateData(prev => {return {
        ...prev, 
        displayname : name,
        username : username, 
        id : address, 
        twitter : twitter, 
        instagram : instagram,
        coverimage : coverimageIPFS,
        avatarimage : avatarIPFS
    }})
    }, [name, username, address, twitter, instagram, coverimageIPFS, avatarIPFS])

    useEffect(() => {
        
        sendCoverFileToIPFS()
        sendAvatarFileToIPFS()
        console.log('avatarIPFS updatedstate: ', avatarIPFS);
        console.log('coverimageIPFS updatedstate: ', coverimageIPFS);
        setupdateData(prev => {
            return {
                ...prev, coverimage : coverimageIPFS, avatarimage : avatarIPFS
            }
        })
    }, [avatar, file])
    
    useEffect(() => {

          console.log('updateData: updated', updateData);
    }, [updateData])

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
            setupdateData(res.data)
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

    const postData = async  () => {
    
        
        if(isprevData) {
            
            console.log('put updateData: ', updateData);
            axios.put(`${process.env.REACT_APP_RESTAPI_JSON_SERVER}/users/${address}`, updateData)
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
            axios.post(`${process.env.REACT_APP_RESTAPI_JSON_SERVER}/users`, updateData)
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

    const handlecover = (e) => {
         console.log('e: ', e.target.files);
         setFile(e.target.files[0])
    }
    const handleavatar = (e) => {
         console.log('e: ', e.target.files);
         setAvatar(e.target.files[0])
    }

    return (
        <div className={cn("section-main", styles.section)}>
            <div className={cn("container-sm", styles.container)}>
                <div className={styles.head}>
                    <div className={styles.title}>
                        <h1 className={cn("h1", styles.title)}>{name ? name : 'my name'}</h1>
                        <button className={cn("button", styles.save)} onClick ={postData}>
                           {settingssaved ? 'Saved' : 'Save settings'}
                        </button>
                    </div>
                    <div className={styles.info}>
                        Update your profile info and manage your wallet
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.side}>
                        <Field label="Profile cover">
                        {coverimageIPFS ? 
                            <img src={`https://gateway.pinata.cloud/ipfs/${coverimageIPFS}`} alt="cover img" className = {styles.coverimg}/> :
                            // <div className={styles.preview}>
                                /* <Image
                                    src="/images/content/profile-cover.png"
                                    width={400}
                                    height={400}
                                    alt="cover image"
                                /> */
                                <img src="/images/content/profile-cover.png" alt="cover img" className = {styles.coverimg}/> 

                            // </div>
                            }
                        
                        <div className={styles.change_avatardiv}>
                            <button
                                className={cn(
                                    "button-stroke button-sm",
                                    styles.change_avatar
                                )} 
                            >
                                <InputFile value={''} onChange={(e) => handlecover(e)}>
                                    <div>{!coverUploading ? 'Change cover' : 'Uploading' }</div>
                                </InputFile>
                                {/* <input type="file" name="image" id="" onChange={(e) => handleavatar(e)} placeholder="change avatar"/> */}
                            </button>
                        </div>
                            {/* <Cover
                                upload={upload}
                                setUpload={handlecover}
                                value={file}
                                onChange={setFile}
                                cover="/images/content/profile-cover.png"
                                min
                            />
                             <InputFile
                                value={file}
                                onChange={setFile}
                                note="Size recommend 2560x756. Max 10mb."
                                
                                min
                             /> */}
                             
                             {/* <input type="file" name="file" id="" onChange={(e) => handlecover(e)}/> */}
                        </Field>
                        <Field label="Display name">
                            <Input
                                value={name}
                                onChange={setName}
                                placeholder="Display name"
                            />
                        </Field>
                        <Field label="Username">
                            <Input
                                className={styles.username_input}
                                value={username}
                                onChange={setUsername}
                                placeholder="Username"
                                success=""
                                arobase
                            />
                        </Field>
                        <Field label="Wallet address">
                            <div className={styles.wallet_status}></div>
                            {address ? 
                            <Input
                                className={styles.wallet_input}
                                value={formatWalletAddress(wallet, 10, 10)}
                                onChange={setWallet}
                                error=""
                            /> : <ConnectButton chainStatus="icon" showBalance={false}/>}
                            {/* <div className={styles.wallet_icon}>
                                <Image
                                    src="/images/content/logos/metamask.svg"
                                    width={20}
                                    height={20}
                                    alt="Metamask"
                                />
                            </div> */}
                        </Field>
                        <Field label="Social links">
                                {/* {networks.map((x, index) => (
                                    <button
                                        className={cn(
                                            "button-stroke",
                                            styles.button_link,
                                            { [styles.connected]: x.connect }
                                        )}
                                        key={index}
                                    >
                                        <Icon name={x.icon} />
                                        {x.title}
                                        {x.connect && (
                                            <div className={styles.disconnect}>
                                                <Icon
                                                    className={styles.close}
                                                    name="close"
                                                    size={20}
                                                />
                                            </div>
                                        )}
                                    </button>
                                ))} */}
                            <div className={styles.links}>
                                <div className={styles.faicons}>
                                    <FaTwitter />
                                </div >
                                <Input
                                    value={twitter}
                                    onChange={settwitter}
                                    placeholder=" @username"
                                /> 
                            </div>
                            <div className={styles.links1}>
                                <div className={styles.faicons}>
                                    <FaInstagram />
                                </div >
                                <Input
                                    value={instagram}
                                    onChange={setinstagram}
                                    placeholder=" @username"
                                />
                            </div>
                        </Field>
                    </div>
                    <div className={styles.avatar}>
                        
                        {avatarIPFS ? 
                        <img src={`https://gateway.pinata.cloud/ipfs/${avatarIPFS}`} alt="avatar img" className = {styles.avatarimg}/> :
                        <div className={styles.preview}>
                            <Image
                                src="/images/content/avatar.png"
                                width={128}
                                height={128}
                                alt="profile image"
                            />
                        </div>
                        }
                        
                        <div>
                            <div className={styles.note}>
                                We recommended an image of at least 800x800px.
                                Max 2mb.
                            </div>

                            <button
                                className={cn(
                                    "button-stroke button-sm",
                                    styles.change_avatar
                                )} 
                            >
                                <InputFile value={''} onChange={(e) => handleavatar(e)}>
                                    <div>{!avatarUploading ? 'Change avatar' : 'Uploading'}</div>
                                </InputFile>
                                {/* <input type="file" name="image" id="" onChange={(e) => handleavatar(e)} placeholder="change avatar"/> */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageUserSetting;
