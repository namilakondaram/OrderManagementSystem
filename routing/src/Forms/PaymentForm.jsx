import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HandlePaymentMechanism from '../Alerts/HandlePaymentMechanism';
import axios from 'axios';
import { Container,InputLabel, TextField, TextareaAutosize, MenuItem } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Alert from '@material-ui/lab/Alert'
import OrderHistory from '../CustomerOrderHistory/OrderHistory'
import Link from '@material-ui/core/Link';
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

function PaymentForm({match}) {

    const classes = useStyles();
    const customerId = match.params.customerId;
    const itemId = match.params.itemId;
    useEffect(()=> {
        fetchItem();
        fetchCustomer();
        fetchSellers();
        console.log(match);
    },[]);

    const [item,setItem] = useState([]);
    const [customer,setCustomer] = useState([]);
    const [paymentOption,setPaymentOption] = useState(0);
    const [sellers,setSellers] = useState([]);
    const [sellerOption,setSellerOption] = useState([]);
    const [isSubmitted,setIsSubmitted] = useState(false);
     const fetchCustomer = async () => {
        const fetchTheCustomer = await fetch(
            `http://localhost:8080/customer/${match.params.customerId}`
        );

        const customer = await fetchTheCustomer.json();
        setCustomer(customer);
        console.log(customer);
    };

    const fetchItem = async () => {
        const fetchTheItem = await fetch(
            `http://localhost:8080/item/${match.params.itemId}`
        );

        const item = await fetchTheItem.json();
        setItem(item)
        console.log(item);
    };

    const fetchSellers = async () => {
        const fetchTheSellers = await fetch(
            `http://localhost:8080/seller/getSellers`
        );

        const sellers = await fetchTheSellers.json();
        setSellers(sellers);
        console.log(sellers);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(sellers);
        console.log(paymentOption);
        setIsSubmitted(true);
    }

    function addMoneyToWallethu()
    {
        axios.put(`http://localhost:8080/addWallet/${customer.customerId}/100.00`)
        .then( response => {
            console.log(response);   
            fetchCustomer();   
        })

    }

    function addMoneyToWalletfihu()
    {
        axios.put(`http://localhost:8080/addWallet/${customer.customerId}/500.00`)
        .then( response => {
            console.log(response);   
            fetchCustomer();   
        })

    }
    function addMoneyToWalletthou()
    {
        axios.put(`http://localhost:8080/addWallet/${customer.customerId}/1000.00`)
        .then( response => {
            console.log(response);   
            fetchCustomer();   
        })

    }
    function addMoneyToWalletfithou()
    {
        axios.put(`http://localhost:8080/addWallet/${customer.customerId}/5000.00`)
        .then( response => {
            console.log(response);   
            fetchCustomer();   
        })

    }
    return (
       <div className={classes.root}>
           { item.itemId!=="0" &&
           <h2> Customer Payment Window</h2>
           }
            { item.itemId==="0" &&
           <h2> Customer Profile</h2>
           }
           <br/><br/>
         <form onSubmit = {submitHandler}>
            <Container>
            <br/><br/>
            <InputLabel htmlFor="customerName">Customer Name: <b>{customer.customerName}</b></InputLabel>
            <br/><br/>
            <InputLabel htmlFor="customerWallet">Wallet Money: <b>₹ {customer.customerWallet}</b> </InputLabel>
            <br/><br/>
            <InputLabel htmlFor="addWallet">Add Money to Wallet: </InputLabel><br/>
            <Button variant="contained" color="primary" size="small" onClick={addMoneyToWallethu}>₹100</Button> &nbsp;
            <Button variant="contained" color="primary" size="small" onClick={addMoneyToWalletfihu}>₹500</Button> &nbsp;
            <Button variant="contained" color="primary" size="small" onClick={addMoneyToWalletthou}>₹1000</Button> &nbsp;
            <Button variant="contained" color="primary" size="small" onClick={addMoneyToWalletfithou}>₹5000</Button> &nbsp;
            
            <br/><br/><br/>
             { item.itemId !== "0" && <InputLabel htmlFor="itemName">Item Name: <b>{item.itemName}</b> </InputLabel> }
            <br/><br/>
             { item.itemId !=="0" && <InputLabel htmlFor="itemPrice">Item Price: <b> ₹ {item.itemPrice} </b> </InputLabel> } <br/>
            <br/><br/>
            { item.itemId !=="0" && 
            <InputLabel htmlFor="paymentOption"> Choose a Payment Option </InputLabel>
            }

            { item.itemId !=="0" &&
            <Select name="paymentOption" value={paymentOption} onChange={e => setPaymentOption(e.target.value)}>
            <MenuItem value="0" disabled selected> </MenuItem>
            <MenuItem value="1" >Pay through Wallet</MenuItem>
            <MenuItem value="2"> Net Banking</MenuItem>
            </Select>
            }
           
            <br/><br/>

            { item.itemId ==="0" &&
             <Link style={{textDecoration:'none'}} href={`/items`}>

                  <Button size="large" color="primary" variant="outlined">
                      Shop Now!
                  </Button>

             </Link>
            
            }
            { item.itemId!=="0" &&
            <InputLabel htmlFor="sellerOption"> Choose a Seller </InputLabel>
           }

           { item.itemId!=="0" &&
            <Select name="sellerOption" value={sellerOption} onChange={e => setSellerOption(e.target.value)} required>
            <MenuItem value="invalid" disabled selected></MenuItem>
            {sellers.map((seller) => (
                <MenuItem value={seller.sellerId}> {seller.sellerName}, {seller.sellerLocation} </MenuItem> 
            ))}
            </Select>
          }
            <br/><br/>

            { item.itemId !=="0" &&
            <Button variant="contained" type = "submit" data-testid="button"> Submit </Button>
             }
            </Container>
        </form>
        <br/><br/>
        { item.itemId!="0" &&
        <Alert severity="info">
        <strong>Note:</strong> If the form is submitted without selecting any payment option or if the payment option seleted is through wallet and wallet does not have sufficient money for purchase, the payment option will be converted to cash on delivery!
        </Alert>
         }
        <br/><br/><br/>
        <OrderHistory cid = {customerId}/>

        {isSubmitted && <HandlePaymentMechanism 
         paymentGateway={paymentOption} 
         itemPrice={item.itemPrice} 
         walletMoney={customer.customerWallet}
         sellerChoice={sellerOption}
         itemId = {item.itemId}
         customerId = {customer.customerId}
          />}
       </div>
    );
}

export default PaymentForm;