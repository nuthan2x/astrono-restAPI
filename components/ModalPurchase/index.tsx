import axios from 'axios';
import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./ModalPurchase.module.sass";
import Modal from "../Modal";
import Icon from "../Icon";
import {useSigner, useAccount} from 'wagmi';
import { numberWithCommas } from "../../utils";

import PreviewLoader from "../PreviewLoader";
import Link from "next/link";
import { ethers, Signer } from "ethers";



type ModalPurchaseProps = {
    visibleModal: boolean;
    setVisibleModal: (e: boolean) => void;
    IsAstronauto : boolean;
};

type ModalStatesType = "confirm" | "waiting" | "complete" | "error";

type ModalType = {
    setStateModal: (e: ModalStatesType) => void;
};

// const Confirm = ({ setStateModal }: ModalType) => (
    
// );


const ModalPurchase = ({
    visibleModal,
    setVisibleModal,
    IsAstronauto
}: ModalPurchaseProps) => {
    const [stateModal, setStateModal] = useState<ModalStatesType>("confirm");
    const [transferModal, setTransferModal] =
    useState<ModalStatesType>(stateModal);
    const [blink, setBlink] = useState<boolean>(false);
    const [mintcounts, setmintcounts] = useState({austronauts : undefined, lumburrs : undefined})
    const [mintTxn, setmintTxn] = useState('')
    const [isAstronauto, setisAstronauto] = useState(true)
    const [mintStatus, setmintStatus] = useState('Confirm purchase')
    const [currentPrice, setcurrentPrice] = useState({ethusd : undefined, bnbusd : undefined, maticusd : undefined})


    const { address, isConnecting, isDisconnected } = useAccount()
    const { data: signer, isError, isLoading } = useSigner();

    const ASTRONAUT_address = "0xFC01Ec839dd9A12b4D34f395c79DE660B3c7BC6a";
    const ASTRONAUT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const ASTRONAUT = new ethers.Contract(ASTRONAUT_address, ASTRONAUT_ABI, signer);

    const LUMBURR_address = "0x62bcc9F6C8a37e31dee56cAb8324c569194D8475";
    const LUMBURR_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const LUMBURR = new ethers.Contract(LUMBURR_address, LUMBURR_ABI, signer);

    const Lumburr_item = {
        name: "Lumburr",
        crypto: "0.001",
        price: (0.001 * Number(currentPrice.maticusd)).toFixed(6),
        location: "Mars",
    };
    
    const Astronauto_item = {
        name: "Astronauto",
        crypto: "0.001",
        price: (0.001 * Number(currentPrice.maticusd)).toFixed(6),
        location: "Earth",
    };
    const exchange = 2646.4;
    
    const handleStateModal = (state: ModalStatesType) => {
        setBlink(true);
        setTransferModal(state);
    };

    const getprice = () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cmatic-network%2Cbinancecoin&order=market_cap_desc&per_page=250&page=1&sparkline=false') 
        .then(res => {
            console.log(res.data)
            setcurrentPrice({ethusd : res.data[0].current_price, bnbusd :res.data[1].current_price, maticusd : res.data[2].current_price,})
        }) 
        .catch(err => console.log(err))
    
    
    }
    
    useEffect(() => {
        setisAstronauto(IsAstronauto)
        getprice()
    }, [IsAstronauto])
    
    useEffect(() => setStateModal(transferModal), [transferModal]);
    useEffect(() => {
        get_mintedcount()
    
    }, [address])

    useEffect(() => {
        setmintTxn('')
        setmintStatus('Confirm purchase')
    }, [])
    

    const get_mintedcount = () => {

        const options_Astronaut = {
        method: 'GET',
        url: 'https://deep-index.moralis.io/api/v2/nft/0xFC01Ec839dd9A12b4D34f395c79DE660B3c7BC6a',
        params: {chain: 'mumbai', format: 'decimal', normalizeMetadata: 'false'},
        headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
        };

        axios
        .request(options_Astronaut)
        .then(function (response) {
            console.log(response.data);
            setmintcounts(prev =>{ return{...prev, austronauts : response.data.total}})
        })
        .catch(function (error) {
            console.error(error);
        });  
        
        const options_LUMBURR = {
        method: 'GET',
        url: 'https://deep-index.moralis.io/api/v2/nft/0x62bcc9F6C8a37e31dee56cAb8324c569194D8475',
        params: {chain: 'mumbai', format: 'decimal', normalizeMetadata: 'false'},
        headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
        };

        axios
        .request(options_LUMBURR)
        .then(function (response) {
            console.log(response.data);
            setmintcounts(prev =>{ return{...prev, lumburrs : response.data.total}})
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    const mintNFT = async( isAstronauto: boolean) => {
        try {
            let tokenId = isAstronauto ? mintcounts.austronauts : mintcounts.lumburrs
            let contract = isAstronauto ? ASTRONAUT : LUMBURR
            let mintprice = isAstronauto ? Astronauto_item.crypto : Lumburr_item.crypto

            console.log('tokenId: ', tokenId);
            const options = {value: ethers.utils.parseUnits('0.001', 'ether')}   
            setmintStatus('Minting')
            let txn = await contract.safeMint(address, tokenId, options)
            setmintTxn(`https://mumbai.polygonscan.com/tx/${txn.hash}`)
            let receipt = await txn.wait()
            setmintStatus('Purchase successful')
            console.log('receipt: ', receipt);


        } catch (error) {
            console.log('error: ', error);
            setmintStatus('Purchase failed')
        }
    }
    
    return (
        <Modal
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        blink={blink}
        >
            <div className={styles.wrapper}>
            <>
                <div className={cn("title", styles.title)}>Confirm purchase</div>
                <div className={styles.info}>
                    <div>
                        <div className={cn("h6", styles.name)}>{isAstronauto ? Astronauto_item.name : Lumburr_item.name}</div>
                        <div className={styles.location}>
                            <Icon name="location" size={20} />
                            {isAstronauto ? Astronauto_item.location : Lumburr_item.location}
                        </div>
                    </div>
                    <div>
                        <div className={cn("h6", styles.crypto)}>{isAstronauto ? `${Astronauto_item.crypto} MATIC` : `${Lumburr_item.crypto} MATIC`}</div>
                        <div className={styles.price}>
                            ~ $ {(isAstronauto ? Astronauto_item.price : Lumburr_item.price)}
                        </div>
                    </div>
                    </div>
                    <div className={styles.exchange}>
                        <Icon name="usd" />
                        Price
                        <div className={styles.value}>
                            1 MATIC = ${Number(currentPrice.maticusd).toFixed(5)}
                        </div>
                    </div>

                    <button
                        className={cn("button", styles.confirm)}
                        onClick={() => mintNFT(isAstronauto)}
                    >
                        {mintStatus}
                    </button>
                    {mintTxn && 
                    
                        <a href={mintTxn && mintTxn} target='_blank' rel='noopener noreferrer'>
                            <button className={cn("button", styles.confirm)}>
                            View Transaction
                            </button>
                        </a>
                    }
                    <div className={styles.note}>
                        Minting this token for <span>{isAstronauto ? `${Astronauto_item.crypto} MATIC` : `${Lumburr_item.crypto} MATIC`}</span> 
                    </div>
            </>
            </div>
        </Modal>
    );
};

export default ModalPurchase;

{/* {
    {   
        confirm: <Confirm setStateModal={handleStateModal} /> , 
        waiting: <Waiting />,
        complete: <Complete />,
        error: <Error setStateModal={handleStateModal} />,
    }[stateModal]
} */}





// const Waiting = ({}) => (
//     <div className={cn(styles.waiting, styles.centered)}>
//         <PreviewLoader
//             className={styles.loader}
//             srcImage="/images/content/loader-char.jpg"
//         />
//         <h5 className={cn("h5", styles.subtitle)}>Waiting for confirmation</h5>
//         <div className={styles.text}>
//             You are purchasing <span className={styles.red}>Lumburr</span> for{" "}
//             <span className={styles.dark}>0,0008 ETH</span>
//         </div>
//     </div>
// );

// const Complete = ({}) => (
//     <div className={cn(styles.centered)}>
//         <div className={cn(styles.icon, styles.success)}>
//             <Icon name="check" size="48" />
//         </div>
//         <h5 className={cn("h5", styles.subtitle)}>Purchased</h5>
//         <div className={styles.text}>Awesome, transaction submitted.</div>
//         <Link href="/">
//             <a className={styles.explore}>
//                 View on explore
//                 <Icon name="external-link" size="16" />
//             </a>
//         </Link>
//     </div>
// );

// const Error = ({
//     setStateModal,
// }: {
//     setStateModal: (e: ModalStatesType) => void;
// }) => (
//     <div className={cn(styles.centered)}>
//         <div className={cn(styles.icon, styles.error)}>
//             <Icon name="alert" size="40" />
//         </div>
//         <h5 className={cn("h5", styles.subtitle)}>Something went wrong</h5>
//         <div className={styles.text}>Sorry, transaction failed</div>
//         <button
//             className={cn("button-sm", styles.retry)}
//             onClick={() => setStateModal("confirm")}
//         >
//             Try again
//         </button>
//     </div>
// );