import { useState ,useEffect} from "react";
import Link from "next/link";
import styles from "../Card/Card.module.sass";
import cn from "classnames";
import Image from "../../Image";
import Icon from "../../Icon";
import Favorite from "../../Favorite";
import ModalSale from "../ModalSale";

import { numberWithCommas } from "../../../utils";
import axios from "axios";

type CardProps = {
    className?: string;
    item: any;
    bigPreview?: boolean;
    saleItem?: boolean;
    buyItem? :boolean;
};

const Card = ({ className, item, bigPreview, saleItem,buyItem }: CardProps) => {
    const [visibleModalSale, setVisibleModalSale] = useState<boolean>(false);
    const [currentPrice, setcurrentPrice] = useState<any>({ethusd : undefined, bnbusd : undefined, maticusd : undefined})

    const getprice = () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cmatic-network%2Cbinancecoin&order=market_cap_desc&per_page=250&page=1&sparkline=false') 
        .then(res => {
            console.log(res.data)
            setcurrentPrice({ethusd : res.data[0].current_price, bnbusd :res.data[1].current_price, maticusd : res.data[2].current_price,})
        }) 
        .catch(err => console.log(err))
    
    
    }

    useEffect(() => {
        getprice()
    
   
    }, [item])
    

    return (
        <div className={cn(styles.card, className)}>
            <div
                className={cn(styles.preview, {
                    [styles.preview_big]: bigPreview,
                })}
                style={{ backgroundColor: item.background || "#EBE3D9" }}
            >
                <div className={styles.image}>
                    {/* <Image
                        src={item.image.src}
                        width={item.image.width}
                        height={item.image.height}
                        alt={item.image.alt}
                    /> */}
                    <img src={item.image.href} alt={item.image.alt} className={styles.myNFTimg}/>
                </div>
                {item.status && (
                    <div className={styles.labels}>
                        {item.status.map((x: any, index: number) => (
                            <div
                                className={cn(
                                    { "status-red": x.color === "red" },
                                    { "status-green": x.color === "green" },
                                    { "status-purple": x.color === "purple" },
                                    styles.status
                                )}
                                key={index}
                            >
                                {x.title}
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.details}>
                    <Favorite className={styles.favorite} />
                    <Link href={item.url}>
                        <a
                            className={cn(
                                "button-stroke",
                                styles.button,
                                styles.buttonDetails
                            )}
                        >
                            View detail
                        </a>
                    </Link>
                    {saleItem && (
                        <>
                            <button
                                onClick={() => setVisibleModalSale(true)}
                                className={cn("button", styles.button)}
                            >
                                Put on sale
                            </button>
                            <ModalSale
                                visibleModal={visibleModalSale}
                                setVisibleModal={() =>
                                    setVisibleModalSale(false)
                                }
                                item={item}
                            />
                        </>
                    )}{buyItem && (
                        <>
                            <button
                                onClick={() => setVisibleModalSale(true)}
                                className={cn("button", styles.button)}
                            >
                                Buy
                            </button>
                            <ModalSale
                                visibleModal={visibleModalSale}
                                setVisibleModal={() =>
                                    setVisibleModalSale(false)
                                }
                                item={item}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className={cn("details_bottom", styles.details_bottom)}>
                <div className={styles.stat}>
                    <div className={cn("label-purple", styles.code)}>
                        #{item.code}
                    </div>
                    <div className={styles.crypto}>{item.crypto}</div>
                </div>
                <div className={styles.info}>
                    <div className={cn("title", styles.title)}>
                        {item.title}
                    </div>
                    <div className={styles.price}>
                        ${(item.price * (currentPrice.maticusd)).toFixed(4)}
                    </div>
                </div>
                {item.location && (
                    <div className={styles.location}>
                        <Icon name="place" size="20" />
                        {item.location}
                        <span>: {item.coordinates}</span>
                    </div>
                )}
                {item.level && (
                    <div className={styles.foot}>
                        <div className={styles.level}>
                            <Icon name="level" size="20" />
                            Level requirement: <span>{item.level}</span>
                        </div>
                        {item.avatars && (
                            <div className={styles.avatars}>
                                {item.avatars.map(
                                    (avatar: string, index: number) => (
                                        <div
                                            className={styles.avatar}
                                            key={index}
                                        >
                                            <Image
                                                src={avatar}
                                                width="24"
                                                height="24"
                                                alt="Avatar"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
