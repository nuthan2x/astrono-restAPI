import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "../../ModalSale/ModalSale.module.sass";
import Modal from "../../Modal";
import Icon from "../../Icon";
import Input from "../../Input";

import { numberWithCommas } from "../../../utils";

import PreviewLoader from "../../PreviewLoader";
import Link from "next/link";
import Image from "../../Image";
import axios from "axios";
import {useSigner, useAccount} from 'wagmi';
import { ethers } from "ethers";

// const item = {
//     name: "Lumburr",
//     crypto: "1 ETH",
//     price: 32.018,
//     location: "Mars",
// };

// const exchange = 2646.4;

type ModalSaleProps = {
    visibleModal: boolean;
    setVisibleModal: (e: boolean) => void;
    item : any;
};

type ModalStatesType = "setprice" | "confirm" | "complete";

type ModalType = {
    setStateModal: (e: ModalStatesType) => void;
    item : any;
    setValue : any;
    value : any;
    currentPrice : any;
    BuyToken: any;
    TxnStatus:any;
    TransferTxn:any;
    ApproveTxn:any;
};

const SetPrice = ({ setStateModal, item, setValue, value , currentPrice}: ModalType) => {
    
    return (
        <div className={cn(styles.set_price, styles.centered)}>
            <PreviewLoader
                className={styles.loader}
                srcImage= {item.image.href}
            />
            <h5 className={cn("title", styles.subtitle)}>
                {`You’re Buying ${item.title} #${item.code} for ${item.crypto}`}
            </h5>
            {/* <div className={styles.field_price}>
                <Input
                    placeholder="0.00"
                    className={styles.input}
                    value={value}
                    onChange={setValue}
                />
                <div className={styles.currency}>
                    <span>MATIC</span>
                    <Image
                        // src="/images/content/etherium.svg"
                        src="/images/content/polygon-token.svg"
                        width={24}
                        height={24}
                        alt="Matic"
                    />
                </div>
            </div> */}
            <div className={styles.note}>
                {`Buying for ${item.crypto} at $ ${item.price * currentPrice}` }
            </div>
            <button
                className={cn("button", styles.continue)}
                onClick={() => setStateModal("confirm")}
            >
                Continue
                <Icon name="arrow-right" size={20} />
            </button>
        </div>
    );
};

const Confirm = ({ setStateModal ,item,  setValue, value, currentPrice, BuyToken, TransferTxn, ApproveTxn, TxnStatus}: ModalType) => (
    <>
        <div className={cn("title", styles.title)}>Confirm Buy</div>
        <div className={styles.info}>
            <div>
                <div className={cn("h6", styles.name)}>{`${item.title} #${item.code}`}</div>
                <div className={styles.location}>
                    <Icon name="location" size={20} />
                    {item.title == 'Astronauto' ? 'Earth': 'Mars'}
                </div>
            </div>
            <div>
                <div className={cn("h6", styles.crypto)}>{`${item.crypto}`}</div>
                <div className={styles.price}>
                    ~ $ {(item.price * Number(currentPrice.maticusd)).toFixed(3)}
                </div>
            </div>
        </div>
        <div className={styles.exchange}>
            <Icon name="usd" />
            Price
            <div className={styles.value}>
                1 MATIC = {currentPrice.maticusd ? `${(currentPrice.maticusd)?.toFixed(6)}` : 'N/A'}
            </div>
        </div>

        <button
            className={cn("button", styles.confirm)}
            onClick={() => 
                {
                    BuyToken()
                }
            }
        >
            {TxnStatus}
        </button>
        {/* <div className={styles.note}>
            By clicking you are signing an approval to list this token for <span>{value} MATIC</span> on marketplace. 
            First approving token  to the marketplace contract and then transfering the token from your wallet to the marketplace contract to list for sale.
        </div> */}
    </>
);



const ModalSale = ({ visibleModal, setVisibleModal, item }: ModalSaleProps) => {
    console.log('item modal: ', item);
    const [stateModal, setStateModal] = useState<ModalStatesType>("setprice");
    const [transferModal, setTransferModal] =useState<ModalStatesType>(stateModal);
    const [blink, setBlink] = useState<boolean>(false);
    const handleStateModal = (state: ModalStatesType) => {
        setBlink(true);
        setTransferModal(state);
    };
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data: signer, isError, isLoading } = useSigner();

    const ASTRONAUT_address = "0xFC01Ec839dd9A12b4D34f395c79DE660B3c7BC6a";
    const ASTRONAUT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const ASTRONAUT = new ethers.Contract(ASTRONAUT_address, ASTRONAUT_ABI, signer);

    const LUMBURR_address = "0x62bcc9F6C8a37e31dee56cAb8324c569194D8475";
    const LUMBURR_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const LUMBURR = new ethers.Contract(LUMBURR_address, LUMBURR_ABI, signer);

    
    const MARKETPLACE_address = "0x50BEBb868Be3b925BeB9423b5f0925694C455b9E";
    const MARKETPLACE_ABI = [{"inputs":[{"internalType":"uint256","name":"_feePercent","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"itemId","type":"uint256"},{"indexed":true,"internalType":"address","name":"nft","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"}],"name":"Bought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"itemId","type":"uint256"},{"indexed":true,"internalType":"address","name":"nft","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":true,"internalType":"address","name":"seller","type":"address"}],"name":"Offered","type":"event"},{"inputs":[],"name":"feeAccount","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemId","type":"uint256"}],"name":"getTotalPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"itemCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"items","outputs":[{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"contract IERC721","name":"nft","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address payable","name":"seller","type":"address"},{"internalType":"bool","name":"sold","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"_nft","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"makeItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemId","type":"uint256"}],"name":"purchaseItem","outputs":[],"stateMutability":"payable","type":"function"}]
    const MARKETPLACE = new ethers.Contract(MARKETPLACE_address, MARKETPLACE_ABI, signer);

    const [value, setValue] = useState<string>("");
    const [currentPrice, setcurrentPrice] = useState({ethusd : undefined, bnbusd : undefined, maticusd : undefined})
    const [ApproveTxn, setApproveTxn] = useState('')
    const [TransferTxn, setTransferTxn] = useState('')
    const [TxnStatus, setTxnStatus] = useState('Buy')
    
    // useEffect(() => {
    //     console.log('value: ', value);
    // }, [value])
    
    useEffect(() => setStateModal(transferModal), [transferModal]);
    useEffect(() => {
      getprice()
    
    }, [item])
    
    
    const getprice = () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cmatic-network%2Cbinancecoin&order=market_cap_desc&per_page=250&page=1&sparkline=false') 
        .then(res => {
            console.log(res.data)
            setcurrentPrice({ethusd : res.data[0].current_price, bnbusd :res.data[1].current_price, maticusd : res.data[2].current_price,})
        }) 
        .catch(err => console.log(err))
    
    }

    const BuyToken = async () => {
        try {
            let contract = item.title == 'Astronauto' ? ASTRONAUT : LUMBURR
            let tokenId = parseInt(item.code).toString()
            setTxnStatus('Signing Tranaction...')

            console.log('tokenId: ', tokenId);
            console.log('Item_Id: ', item.Item_Id);

            const options = {value: ethers.utils.parseUnits((Number(item.price) * 1.01 * 1e18).toString(), 'wei')}   // 1% fees 
            console.log('options: ', options);
            let transfer_Txn = await MARKETPLACE.purchaseItem((item.Item_Id).toString(), options)

            setTransferTxn(`https://mumbai.polygonscan.com/tx/${transfer_Txn.hash}`)
            setTxnStatus('Buying...')

            let receipt2 = await transfer_Txn.wait()
            setStateModal("complete")
            
        } catch (error) {
            console.log('error: ', error);
            setTxnStatus('Transaction Failed')
        }
    }

    return (
        <Modal
            visible={visibleModal}
            onClose={() => setVisibleModal(false)}
            blink={blink}
            setBlink={setBlink}
        >
            <div className={styles.wrapper}>
                {
                    {
                        setprice: <SetPrice 
                            setStateModal={handleStateModal} 
                            item={item} 
                            setValue={setValue} 
                            value={value} 
                            currentPrice={currentPrice} 
                            BuyToken={BuyToken}
                            TxnStatus={TxnStatus}
                            ApproveTxn ={ApproveTxn}
                            TransferTxn ={TransferTxn}
                        />,

                        confirm: <Confirm 
                            setStateModal={handleStateModal} 
                            item={item} 
                            setValue={setValue} 
                            value={value} 
                            currentPrice={currentPrice} 
                            BuyToken={BuyToken}
                            TxnStatus={TxnStatus}
                            ApproveTxn ={ApproveTxn}
                            TransferTxn ={TransferTxn}
                        />,

                        complete: 
                                <div className={cn(styles.centered)}>
                                    <div className={cn(styles.icon, styles.success)}>
                                        <Icon name="check" size="48" />
                                    </div>
                                    <h5 className={cn("h5", styles.subtitle)}>Congrats!</h5>
                                    <div className={styles.text}> Awesome, purchase transfer was successful.</div>
                                    <Link href="/user-profile">
                                        <a className={cn("button", styles.view)}>View my Profile</a>
                                    </Link>
                                    
                                    <a className={styles.explore} href={TransferTxn} target='_blank' rel='noopener noreferrer'>
                                        View on explorer
                                        <Icon name="external-link" size="16" />
                                    </a>
                                    
                                </div>,
                    }[stateModal]
                }
            </div>
        </Modal>
    );
};

export default ModalSale;
