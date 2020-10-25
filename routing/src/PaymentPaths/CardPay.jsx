import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HandlePaymentMechanism from '../Alerts/HandlePaymentMechanism';
import axios from 'axios';
import { Container,InputLabel, TextField, TextareaAutosize, MenuItem } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import HandleCardPay from './HandleCardPay'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: 400,
    },
}));

function CardPay({match}) {

    const classes = useStyles();
    useEffect(()=> {
        console.log(match);
    },[]);

    const CustomerId = match.params.customerId;
    const ItemId = match.params.itemId;
    const SellerId = match.params.sellerId;
    const ItemPrice = match.params.itemPrice;
    const Payment = "Paid through Card";
    const [isSubmitted,setIsSubmitted] = useState(false);
    const [cardNumber,setCardNumber] = useState([]);
    const [cvv,setCvv] = useState([]);
    const submitHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    }

    return (
       <div className={classes.root}>
           <h2> Card Details: </h2><br/><br/>
         <form onSubmit = {submitHandler}>
            <Container>
            <br/><br/>
            <InputLabel htmlFor="cardNumber">Card Number: </InputLabel>
            <Input type="text" name="cardNumber" inputProps={{ maxLength: 12, minlength:12 }} value={cardNumber} onChange={e => setCardNumber(e.target.value)} required/>
            <br/><br/>
            <InputLabel htmlFor="cvv">CVV:</InputLabel>
            <Input type="text" name="cvv" inputProps={{ maxLength: 3, minlength:3 }} value={cvv} onChange={e => setCvv(e.target.value)} required/>
            <br/><br/>
            <InputLabel htmlFor="itemPrice">Order Price: <b> ₹ {ItemPrice} </b> </InputLabel><br/>
            <br/><br/>
            <Button variant="contained" type = "submit" > Pay </Button>
            </Container>
        </form>
        <br/><br/>
        <Alert severity="info">
        <strong>Note:</strong><br/>
        Card Number must be of 12 digits <br/>
        CVV must contain 3 digits<br/>
        </Alert>
        {isSubmitted && <HandleCardPay
            CustomerId = {CustomerId}
            ItemId = {ItemId}
            SellerId = {SellerId}
            ItemPrice = {ItemPrice}
            Payment = {Payment}
          />}
       </div>
    );
}

export default CardPay;