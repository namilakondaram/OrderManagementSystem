import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select'
function SellerOrders({match}) {
    const sellerId = match.params.sellerId;
    useEffect(()=> {
        fetchOrders();
        fetchSeller();
        console.log(match);
    },[]);
    const [orders,setOrders] = useState([]);
    const [orderStatus,setOrderStatus] = useState([]);
    const fetchOrders = async () => {
        const fetchTheOrders = await fetch(
            `http://localhost:8080/getOrders/${sellerId}`
        ); 
        const orderStore = await fetchTheOrders.json();
        setOrders(orderStore);
        console.log(orderStore);

    }

    const [seller,setSeller] = useState([]);
    const fetchSeller = async () => {
        const fetchTheSellers = await fetch(
            `http://localhost:8080/seller/${sellerId}`
        ); 
        const sellerStore = await fetchTheSellers.json();
        setSeller(sellerStore);
        console.log(sellerStore);
        fetchOrders();
    }
    
   return(
       <div>

           <h3> Orders List of {seller.sellerName}, {seller.sellerLocation} </h3>
           <br/><br/>
    <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell><b>Order ID</b></TableCell>
              <TableCell align="left"><b>Customer ID</b></TableCell>
              <TableCell align="left"><b>Order Value</b></TableCell>
              <TableCell align="left"><b>Payment Status</b></TableCell>
              <TableCell align="left"><b>Order Status</b></TableCell>
              <TableCell align="left"><b>Change Status</b> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tablebody-event">
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell  component="th" scope="row">
                  {order.orderId}
                </TableCell> 
                <TableCell  align="left">{order.customerId}</TableCell>
                <TableCell  align="left">₹{order.orderValue}</TableCell>
                <TableCell align="left">{order.paymentMode}</TableCell>
                <TableCell  align="left"> {order.orderStatus} </TableCell>
                <TableCell align="left"> 
                <Link style={{textDecoration:'none'}} href={`/changeStatus/${seller.sellerId}/${order.orderId}/PROCESSING`}>
                <Button>Processing</Button><br/>
                </Link>

                <Link style={{textDecoration:'none'}} href={`/changeStatus/${seller.sellerId}/${order.orderId}/DELIVERED`}>
                <Button color="primary" >Delivered</Button><br/>
                </Link>
                <Link style={{textDecoration:'none'}} href={`/changeStatus/${seller.sellerId}/${order.orderId}/DISPATCHED`}>
                <Button color="secondary">Dispatched</Button>
                </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     </div>
   );
}

export default SellerOrders;