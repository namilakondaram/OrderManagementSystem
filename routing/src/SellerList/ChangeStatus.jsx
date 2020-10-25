import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom"

function ChangeStatus({match}) {
    const id = match.params.id;
    const status = match.params.status;
    const sellerId = match.params.sellerId;
    useEffect(()=> {
        ChangeStatus();
        console.log(match);
    },[]);

    const [statusOutput,setStatusOutput] = useState(false);

    const ChangeStatus =  () => {
        axios.put(`http://localhost:8080/updateOrderStatus/${id}/${status}`)
        .then( response => {
            console.log(response);
            setStatusOutput(response.data);       
        })
    }
    return <Redirect to={`/SellerOrders/${sellerId}`} />
}

export default ChangeStatus;