import React, { useState, useEffect } from 'react';
import {Redirect} from "react-router-dom"

function HandleCardPay(props) {

    useEffect(()=> {
        console.log(props);
    },[]);

    const CustomerId = props.CustomerId;
    const ItemId = props.ItemId;
    const SellerId = props.SellerId;
    const ItemPrice = props.ItemPrice;
    const payment = props.Payment;
    return <Redirect to={`/Ordersummary/${CustomerId}/${ItemId}/${SellerId}/${ItemPrice}/${payment}`}/>
}

export default HandleCardPay;