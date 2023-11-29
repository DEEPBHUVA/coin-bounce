import React, { useEffect, useState } from 'react'
import styles from './Crypto.module.css'
import {getCrypto} from '../../api/external';
import Loder from '../../components/Loder/Loder';

function Crypto() {
    const [data, setData] = useState([]);
    useEffect(() => {
        //IIFE immediately invoked function expression
        (async function cryptoApiCall(){
            const response = await getCrypto();
            setData(response);
            // console.log(response);
        })();

        //Clean up
        return () => {
            setData([]);
        };
    },[]);

    if(data?.length === 0){
        return <Loder text='Crypto Currencies'/>
    }

    const negativeStyle = {
        color: "#ea3943",
    };
    
      const positiveStyle = {
        color: "#16c784",
    };

  return (
    <table className={styles.table}>
        <thead>
            <tr className={styles.head}>
                <th>#</th>
                <th>Coin</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>24hr</th>
            </tr>
        </thead>
        <tbody className={styles.body}>
            {data?.map((coin) => (
                <tr id={coin.id} className={styles.tableRow}>
                    <td>{coin.market_cap_rank}</td>
                    <td>
                        <div className={styles.logo}>
                            <img src={coin.image} width={40} height={40} alt=''></img>
                            {coin.name}
                        </div>
                    </td>
                    <td>
                        <div className={styles.symbol}>
                            {coin.symbol}
                        </div>
                    </td>
                    <td>{coin.current_price}</td>
                    <td
                        style={
                            coin.price_change_percentage_24h < 0
                            ? negativeStyle
                            : positiveStyle
                        }>
                        {coin.price_change_percentage_24h}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default Crypto