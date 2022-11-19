import { useState ,useEffect} from "react";
import cn from "classnames";
import styles from "./Catalog.module.sass";
import List from "./List";
import SortingLink from "./SortingLink";
import Filters from "./Filters";
import Form from "../Form";
import Dropdown from "../Dropdown";
import Wishlist from "./Wishlist";
import axios from 'axios';
import {useSigner, useAccount} from 'wagmi';

import { characters } from "../../mocks/characters";
import { planets } from "../../mocks/planets";
import { items } from "../../mocks/items";
import { bundles } from "../../mocks/bundles";

const sortDropdown: Array<string> = ["All", "On sale"];

type ListProps = {
    className?: string;
    value: any[];
    filters?: boolean;
    sort?: boolean;
    crop?: boolean;
    wishlist?: boolean;
    saleItem?: boolean;
};

const Catalog = ({
    className,
    value,
    filters,
    sort,
    crop,
    wishlist,
    saleItem,
}: ListProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [dropdown, setDropdown] = useState<string>(sortDropdown[0]);
    const [search, setSearch] = useState("");
    const [Characters, setCharacters] = useState([])
    const [currentPrice, setcurrentPrice] = useState({ethusd : undefined, bnbusd : undefined, maticusd : undefined})


    const { address, isConnecting, isDisconnected } = useAccount()
    const { data: signer, isError, isLoading } = useSigner();

    useEffect(() => {
      getNFTdata()
      
      
    }, [address])

    useEffect(() => {
        
        console.log('Characters: ', Characters);
    }, [Characters])

    useEffect(() => {
      setCharacters([])
    }, [isDisconnected])
    
    
    const getprice = () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cmatic-network%2Cbinancecoin&order=market_cap_desc&per_page=250&page=1&sparkline=false') 
        .then(res => {
            console.log(res.data)
            setcurrentPrice({ethusd : res.data[0].current_price, bnbusd :res.data[1].current_price, maticusd : res.data[2].current_price,})
        }) 
        .catch(err => console.log(err))
    
    
    }

    const filterData = (array:any, title:any, ipfsFolderhash:any, setarray:any) => {
        let filtered_array = array.map(each => {
                if(each.owner_of == address?.toLocaleLowerCase()) {
                    
                    setarray(prev => [...prev, {
                        title: title,
                        code: (each.token_id).length < 2 ? `0${each.token_id}` : each.tokenid,
                        crypto: "0.001 MATIC",
                        price: 0.001 ,
                        image: {
                            href: `${ipfsFolderhash}${(Number(each.token_id) + 1).toString().length < 2 ? `0${Number(each.token_id) + 1}` : each.tokenid}.png`,
                            width: 372,
                            height: 372,
                            alt: "Character",
                        },
                        background: "#D1E2DB",
                        url: "/character-details",
                    }])
                }
            
        })
        // setarray(prev => [...prev, filtered_array])
        // console.log('filtered_array: ', filtered_array);
    }
 
    const getNFTdata = () => {
        getprice()
        setCharacters([])
        const options_Character1 = { // austranauto
            method: 'GET',
            url: 'https://deep-index.moralis.io/api/v2/nft/0xFC01Ec839dd9A12b4D34f395c79DE660B3c7BC6a/owners',
            params: {chain: 'mumbai', format: 'decimal', normalizeMetadata: 'false'},
            headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
        };
          
        axios
        .request(options_Character1)
        .then(function (response) {
            console.log(response.data);
            filterData(response.data.result, 'Astronauto','https://gateway.pinata.cloud/ipfs/bafybeicbjcnka4tiwr6r2fbmsrer3ebynar66q2vw3gtc4yya2pi2n6uym/', setCharacters)
        })
        .catch(function (error) {
            console.error(error);
        });
// https://bafybeicbjcnka4tiwr6r2fbmsrer3ebynar66q2vw3gtc4yya2pi2n6uym.ipfs.nftstorage.link/       https://ipfs.fleek.co/ipfs/
        const options_Character2 = { // lumburr
            method: 'GET',
            url: 'https://deep-index.moralis.io/api/v2/nft/0x62bcc9F6C8a37e31dee56cAb8324c569194D8475/owners',
            params: {chain: 'mumbai', format: 'decimal', normalizeMetadata: 'false'},
            headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
        };
                
        axios
        .request(options_Character2)
        .then(function (response) {
            console.log(response.data);
            filterData(response.data.result, 'Lumburr','https://gateway.pinata.cloud/ipfs/Qme5xLumtZACSkFt4ak7Wxzd3FWhtmzfH3DNwRzjaEKxPd/', setCharacters)
        })
        .catch(function (error) {
            console.error(error);
        });
        
    }
    

    const handleSubmit = () => alert();

    return (
        <>
            <div className={cn(styles.catalog, className)}>
                <div className={cn(styles.head)}>
                    <div className={cn("container", styles.container)}>
                        <div className={styles.nav}>
                            {value.map((x, index) => (
                                <SortingLink
                                    item={x}
                                    key={index}
                                    number={activeIndex}
                                    setNumber={setActiveIndex}
                                    index={index}
                                />
                            ))}
                        </div>
                        <div className={styles.actions}>
                            <Form
                                className={styles.form}
                                value={search}
                                setValue={setSearch}
                                onSubmit={() => handleSubmit()}
                                placeholder="Search character, planet, item..."
                                type="text"
                                name="search"
                                icon="search"
                            />
                            {filters && <Filters />}
                        </div>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={cn("container", styles.container)}>
                        {sort && (
                            <div className={styles.sort}>
                                <div className={cn("h3", styles.title)}>
                                    {value[activeIndex].title}
                                </div>
                                <Dropdown
                                    options={sortDropdown}
                                    value={dropdown}
                                    setValue={setDropdown}
                                    icon="filters"
                                />
                            </div>
                        )}

                        {wishlist ? (
                            <Wishlist value={activeIndex} />
                        ) : (
                            {
                                0: (
                                    <List
                                        items={Characters}
                                        crop={crop}
                                        saleItem={saleItem}
                                    />
                                ),
                                1: (
                                    <List
                                        items={planets}
                                        crop={crop}
                                        saleItem={saleItem}
                                    />
                                ),
                                2: (
                                    <List
                                        items={items}
                                        crop={crop}
                                        saleItem={saleItem}
                                    />
                                ),
                                3: (
                                    <List
                                        items={bundles}
                                        bigPreview
                                        col2
                                        saleItem={saleItem}
                                        crop={crop}
                                    />
                                ),
                            }[activeIndex]
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalog;
