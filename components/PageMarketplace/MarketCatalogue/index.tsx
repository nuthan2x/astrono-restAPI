import { useState ,useEffect} from "react";
import cn from "classnames";
import styles from "./Catalog.module.sass";
import List from "./List";
import SortingLink from "./SortingLink";
import Filters from "./Filters";
import Form from "../../Form";
import Dropdown from "../../Dropdown";
import Wishlist from "./Wishlist";
import axios from 'axios';
import {useSigner, useAccount} from 'wagmi';


import { characters } from '../../../mocks/characters'
import { planets } from "../../../mocks/planets";
import { items } from "../../../mocks/items";
import { bundles } from "../../../mocks/bundles";
import { ethers } from "ethers";
import Character from "../../PageHome/Acquaintance/Character";

const sortDropdown: Array<string> = ["All", "On sale"];
 
type ListProps = {
    className?: string;
    value: any[];
    filters?: boolean;
    sort?: boolean;
    crop?: boolean;
    wishlist?: boolean;
    saleItem?: boolean;
    buyItem? :boolean;
};

const Catalog = ({
    className,
    value,
    filters,
    sort,
    crop,
    wishlist,
    saleItem,
    buyItem,
}: ListProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [dropdown, setDropdown] = useState<string>(sortDropdown[0]);
    const [search, setSearch] = useState("");
    const [Characters, setCharacters] = useState([])
    const [currentPrice, setcurrentPrice] = useState({ethusd : undefined, bnbusd : undefined, maticusd : undefined})
    const [makeEvents, setmakeEvents] = useState<any>([])
    const [purchaseEvents, setpurchaseEvents] = useState<any>([])
    const [marketItems, setmarketItems] = useState<any>([])

    const { address, isConnecting, isDisconnected } = useAccount()
    const { data: signer, isError, isLoading } = useSigner();

    const ASTRONAUT_address = "0xFC01Ec839dd9A12b4D34f395c79DE660B3c7BC6a";
    const LUMBURR_address = "0x62bcc9F6C8a37e31dee56cAb8324c569194D8475";
    const MARKETPLACE_address = "0x50BEBb868Be3b925BeB9423b5f0925694C455b9E";

    useEffect(() => {
      getNFTdata()
      
      
    }, [address])

    // useEffect(() => {
        
    //     console.log('Characters: ', Characters);
    // }, [Characters])

    useEffect(() => {
      setCharacters([])
    }, [isDisconnected])

    useEffect(() => {
    
        console.log('marketItems1234: ', marketItems);
        filterData()
    }, [marketItems])

    useEffect(() => {
        
        console.log('characters: ', Characters); 
    }, [Characters])

    useEffect(() => {
      
        filterMarketItems()
     
    }, [makeEvents, purchaseEvents])
    
    
    
    
    const getprice = () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cmatic-network%2Cbinancecoin&order=market_cap_desc&per_page=250&page=1&sparkline=false') 
        .then(res => {
            console.log(res.data)
            setcurrentPrice({ethusd : res.data[0].current_price, bnbusd :res.data[1].current_price, maticusd : res.data[2].current_price,})
        }) 
        .catch(err => console.log(err))
    }
// https://bafybeicbjcnka4tiwr6r2fbmsrer3ebynar66q2vw3gtc4yya2pi2n6uym.ipfs.nftstorage.link/    https://ipfs.fleek.co/ipfs/
    const filterData = () => {
        let filtered_array = marketItems.map(each => {
            let ipfsFolderhash = each.title == 'Astronauto' ? 'https://gateway.pinata.cloud/ipfs/bafybeicbjcnka4tiwr6r2fbmsrer3ebynar66q2vw3gtc4yya2pi2n6uym/' : 'https://gateway.pinata.cloud/ipfs/Qme5xLumtZACSkFt4ak7Wxzd3FWhtmzfH3DNwRzjaEKxPd/'
                    
                    return {
                        title: each.title,
                        code: (each.tokenId).length < 2 ? `0${each.tokenId}` : each.tokenId,
                        Item_Id : each.Item_Id,
                        crypto: `${each.listed_price / 1e18} MATIC`,
                        price: each.listed_price / 1e18 ,
                        image: {
                            href: `${ipfsFolderhash}${(Number(each.tokenId) + 1).toString().length < 2 ? `0${Number(each.tokenId) + 1}` : each.tokenId}.png`,
                            width: 372,
                            height: 372,
                            alt: "Character",
                        },
                        background: "#D1E2DB",
                        url: "/character-details",
                    }
                
            
        })
        
        setCharacters(filtered_array)
    }



    
 
    const getNFTdata = () => {

        
        const makeItem_events = {
            method: 'GET',
            url: 'https://deep-index.moralis.io/api/v2/0x50BEBb868Be3b925BeB9423b5f0925694C455b9E/logs',
            params: {
                chain: 'mumbai',
                from_block: '29197245',
                topic0: '0x655a0cf9c8db81512be9a76dc1c5ae5380b8816ce6ad659cd61b715e2999d59a'
            },
            headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
        };
        
        axios
        .request(makeItem_events)
        .then(function (response) {
                let makeItem_eventArray:any = []
                // console.log('makeItem_events',response.data);
                response.data.result.map(each => {

                    let tokenId = parseInt(each.data?.slice(66,130))
                    let NFT_contractAddress = `0x${each.topic1?.slice(26)}`
                    let title = NFT_contractAddress == ASTRONAUT_address.toLocaleLowerCase() ? 'Astronauto':'Lumburr'
                    let Item_Id = parseInt(each.data?.slice(2,66))
                    let listed_price =  parseInt( `0x${each.data?.slice(130,194)}`)

                    makeItem_eventArray.push( {
                        tokenId : tokenId,
                        NFT_contractAddress : NFT_contractAddress,
                        title : title,
                        Item_Id : Item_Id,
                        listed_price : listed_price,
                    })
                })
                console.log('makeItem_eventArray: ', makeItem_eventArray);
                setmakeEvents(makeItem_eventArray)
            })
            .catch(function (error) {
                console.error(error);
        });
        

        const purchaseItem_events = {
            method: 'GET',
            url: 'https://deep-index.moralis.io/api/v2/0x50BEBb868Be3b925BeB9423b5f0925694C455b9E/logs',
            params: {
              chain: 'mumbai',
              from_block: '29197245',
              topic0: '0x8b4c9c8a607d67b321582dd8461041b1dc2ceeca70c8b7f37f8e02095cf2e76d'
            },
            headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
          };
          
        axios
            .request(purchaseItem_events)
            .then(function (response) {
              let PurchaseItem_eventArray:any = []
            //   console.log('purchaseItem_events',response.data);
              response.data.result.map(each => {
  
                let tokenId = parseInt(each.data?.slice(66,130))
                let NFT_contractAddress = `0x${each.topic1?.slice(26)}`
                let title = NFT_contractAddress == ASTRONAUT_address.toLowerCase() ? 'Astronauto':'Lumburr'
                let Item_Id = parseInt(each.data?.slice(2,66))
                let listed_price =  parseInt( `0x${each.data?.slice(130,194)}`)
  
                PurchaseItem_eventArray.push( { 
                    tokenId : tokenId,
                    NFT_contractAddress : NFT_contractAddress,
                    title : title,
                    Item_Id : Item_Id,
                    listed_price : listed_price,
                })
              })
                console.log('PurchaseItem_eventArray: ', PurchaseItem_eventArray);
                setpurchaseEvents(PurchaseItem_eventArray)
            })
            .catch(function (error) {
              console.error(error);

        }) 
        
    }
    
    const filterMarketItems = () => {
        let filteredArray:any = []
     
        let array1 = makeEvents.map(each => each.Item_Id)
        let array2 = purchaseEvents.map(each => each.Item_Id)
        var array3 = array1.filter(function(obj) { return array2.indexOf(obj) == -1; });
        console.log('array3: ', array3);
        setmarketItems([])
        for (let i = 0; i < array3?.length; i++) {
            makeEvents.map(each => {
                if (each.Item_Id == array3[i]) {
                    filteredArray.push(each)
                    setmarketItems(prev => [...prev,each])  
                }
            })
        } 

        console.log('filteredArray: ', filteredArray);
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
                                        buyItem={buyItem}
                                    />
                                ),
                                1: (
                                    <List
                                        items={planets}
                                        crop={crop}
                                        buyItem={buyItem}
                                    />
                                ),
                                2: (
                                    <List
                                        items={items}
                                        crop={crop}
                                        buyItem={buyItem}
                                    />
                                ),
                                3: (
                                    <List
                                        items={bundles}
                                        bigPreview
                                        col2
                                        buyItem={buyItem}
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
