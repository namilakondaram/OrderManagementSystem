import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
function OrderHistory(props) {
    const customerId = props.cid;
    useEffect(()=> {
        fetchCustomerOrders();
        console.log(props);
    },[]);
    const [orders,setOrders] = useState([]);
    const fetchCustomerOrders = async () => {
        const fetchTheOrders = await fetch(
            `http://localhost:8080/getOrders/customer/${props.cid}`
        ); 
        const orderStore = await fetchTheOrders.json();
        setOrders(orderStore);
        console.log(orderStore);
        console.log(props.cid);
    }

    
   return(
       <div>
           <h3> Order History </h3>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     </div>
   );
}

export default OrderHistory;