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

function CustomerLoginForm({match}) {

    const itemId = match.params.item;
    const classes = useStyles();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [customerId,setCustomerId] = useState([]);
    const [customerPassword,setCustomerPassword] = useState([]);
    const [formOutput,setFormOutput] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8080/customer/login/${customerId}/${customerPassword}`)
        .then( response => {
            console.log(response);
            setFormOutput(response.data);
            setIsSubmitted(true);
           
        })
    }
    return (
       <div className={classes.root}>
           <h2> Customer Login Form</h2><br/><br/>
         <form onSubmit = {submitHandler}>
            <Container>
            <br/><br/>
            <InputLabel htmlFor="customerId">Customer Id: </InputLabel>
            <Input type="text" name="customerId" value={customerId} onChange={e => setCustomerId(e.target.value)}/>
            <br/><br/>
            <InputLabel htmlFor="customerPassword">Password: </InputLabel>
            <Input type="password" name="customerPassword"  value={customerPassword} onChange={e => setCustomerPassword(e.target.value)}/>
            <br/><br/>
            <Button variant="contained" type = "submit" data-testid="button"> Submit </Button>
            </Container>
        </form>
        {isSubmitted && <HandleAlert type="customer" id={customerId} output={formOutput} item={itemId}/>}  
       </div>
    );
}

export default CustomerLoginForm;
