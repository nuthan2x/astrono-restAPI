import React,{useState, useEffect} from "react";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "../../Image";
import Icon from "../../Icon";
import { ItemsSlideType } from "../../../types";
import axios from "axios";

import { numberWithCommas } from "../../../utils";

type CardProps = {
    className?: string;
    value?: ItemsSlideType;
    setValue: (value: ItemsSlideType) => void;
    item: ItemsSlideType;
};

const Card = ({ className, value, setValue, item }: CardProps) => {
    const [currentPrice, setcurrentPrice] = useState({ethusd : undefined, bnbusd : undefined, maticusd : undefined})

    useEffect(() => {
     getprice()
    }, [])
    

    const getprice = () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cmatic-network%2Cbinancecoin&order=market_cap_desc&per_page=250&page=1&sparkline=false') 
        .then(res => {
            console.log(res.data)
            setcurrentPrice({ethusd : res.data[0].current_price, bnbusd :res.data[1].current_price, maticusd : res.data[2].current_price,})
        }) 
        .catch(err => console.log(err))
    
    
    }
    
    return (
        <div
            className={cn(styles.card, className, {
                [styles.checked]: value === item,
            })}
            onClick={() => setValue(item)}
        >
            <div className={styles.check}>
                <Icon name="checkbox" size={18} />
            </div>
            <div className={styles.preview}>
                <Image
                    src={item.image.src}
                    width={item.image.width}
                    height={item.image.height}
                    alt={item.title}
                />
            </div>
            <div className={styles.details}>
                <div>
                    <div className={cn("h6", styles.title)}>{item.title}</div>
                    <div className={styles.location}>
                        <Icon name="location" />
                        {item.location}
                    </div>
                </div>
                <div>
                    <div className={styles.crypto}>{`${item.crypto}  MATIC`}</div>
                    <div className={styles.price}>
                        ${(Number(item.crypto) * Number(currentPrice.maticusd)).toFixed(5)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
