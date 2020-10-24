import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HandleAlert from '../Alerts/HandleAlert';
import axios from 'axios';
import { Container,InputLabel } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


function SellerLoginForm({match}) {
    const classes = useStyles();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sellerId,setSellerId] = useState([]);
    const [sellerPassword,setSellerPassword] = useState([]);
    const [formOutput,setFormOutput] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8080/seller/login/${sellerId}/${sellerPassword}`)
        .then( response => {
            console.log(response);
            setFormOutput(response.data);
            setIsSubmitted(true);
        
        })
    }
    return (
       <div className={classes.root}>
           <h2> Seller Login Form</h2><br/><br/>
         <form onSubmit = {submitHandler}>
            <Container>
            <br/><br/>
            <InputLabel htmlFor="sellerId">Seller Id: </InputLabel>
            <Input type="text" name="sellerId" value={sellerId} onChange={e => setSellerId(e.target.value)}/>
            <br/><br/>
            <InputLabel htmlFor="sellerPassword">Password: </InputLabel>
            <Input type="password" name="sellerPassword"  value={sellerPassword} onChange={e => setSellerPassword(e.target.value)}/>
            <br/><br/>
            <Button variant="contained" type = "submit" data-testid="button"> Submit </Button>
            </Container>
        </form>
        {isSubmitted && <HandleAlert type="seller" id={sellerId} output={formOutput}/>} 
       </div>
    );
}

export default SellerLoginForm;