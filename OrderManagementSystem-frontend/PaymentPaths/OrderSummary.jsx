import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Link from '@material-ui/core/Link' 
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

function OrderSummary({match}) {

    const classes = useStyles();
    useEffect(()=> {
        placeOrder();
        console.log(match);
    },[]);

    const [orderOutput,setOrderOutput] = useState([]);

    const placeOrder =  () => {
        const CustomerId = match.params.customerId;
        const ItemId = match.params.itemId;
        const SellerId = match.params.sellerId;
        const Payment = match.params.payment;
        const ItemPrice = match.params.itemPrice
        axios.post(`http://localhost:8080/placeOrder/${CustomerId}/${ItemId}/${SellerId}/${Payment}/${ItemPrice}`)
        .then( response => {
            console.log(response);
            setOrderOutput(response.data);       
        })
    }

   
    return (
       <div className={classes.root} style={{alignContent:'center'}}>
           <h2> Order Report</h2><br/><br/>
        <Alert severity="success">
            <br/>
             Hi, The Order has been placed successfully! 
             <br/>
             Please Expect the delivery of the product with in 3 days!
             <br/> 
             Please note that your Order Number is: <strong>{orderOutput} </strong>, for further reference
             <br/>
             Thanks for shopping with us!!
        </Alert>
        <br/>
        <br/>
        <Link style={{textDecoration:'none'}} href="/items">
        <Button variant="contained" color="primary">
         Continue Shopping!   
         </Button> 
        </Link>
       </div>
    );
}

export default OrderSummary;