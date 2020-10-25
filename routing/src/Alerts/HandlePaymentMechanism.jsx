import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import {Redirect} from "react-router-dom"

function HandlePaymentMechanism(props) {
    console.log(props);
    const paymentGateway = props.paymentGateway;
    const itemPrice = props.itemPrice;
    const walletMoney = props.walletMoney;
    const sellerId = props.sellerChoice;
    const itemId = props.itemId;
    const customerId = props.customerId;
    const result = walletMoney - itemPrice;
    if(paymentGateway === "2") {
        return <Redirect to={`/CardPath/${customerId}/${itemId}/${sellerId}/${itemPrice}`}/>
    }
    else if(paymentGateway === "1" && result >= 0) {
       return <Redirect to={`/WalletPath/${customerId}/${itemId}/${sellerId}/${itemPrice}/${walletMoney}`}/>  
    }
    else {
        const payment = 'Cash On Delivery';
      return <Redirect to={`/Ordersummary/${customerId}/${itemId}/${sellerId}/${itemPrice}/${payment}`}/>
    }
}

export default HandlePaymentMechanism;