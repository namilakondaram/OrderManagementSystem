import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import {Redirect} from "react-router-dom"

function HandleAlert(props) {
   const type = props.type;
   const id=props.id;
   const output=props.output;

   if(type === "customer") {
          if(output) {
              return <Redirect to={`/PaymentForm/${props.id}/${props.item}`}/>
          }
          else {
            return (
                <Alert severity="error">
                 <AlertTitle>Customer Login Failure</AlertTitle>
                  The customer with id: <strong>{id} </strong> is invalid!  
                </Alert>
            
             );
          }
   }
   else {

       if(output) 
       {
           return <Redirect to={`/SellerOrders/${props.id}`} />    
       } 
       else {
           return (
            <Alert severity="error">
            <AlertTitle>Seller Login Failure</AlertTitle>
             The seller with id: <strong>{id} </strong> is invalid!  
           </Alert> 
           );
       }

   }
}

export default HandleAlert