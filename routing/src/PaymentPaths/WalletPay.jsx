import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom"

function WalletPay({match}) {

    useEffect(()=> {
        deductMoney();
        console.log(match);
    },[]);

    const [payStatus,setPayStatus] = useState([]);
    const CustomerId = match.params.customerId;
    const ItemId = match.params.itemId;
    const SellerId = match.params.sellerId;
    const ItemPrice = match.params.itemPrice;
    const walletMoney = match.params.walletMoney;
    const payment = "Paid through Wallet";
    const deductMoney =  () => {
        axios.put(`http://localhost:8080/deductWallet/${CustomerId}/${ItemPrice}`)
        .then( response => {
            console.log(response);
            setPayStatus(response.data);       
        })
    }

    return <Redirect to={`/Ordersummary/${CustomerId}/${ItemId}/${SellerId}/${ItemPrice}/${payment}`}/>
}

export default WalletPay;