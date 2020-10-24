import React from 'react';
import './App.css';
import Nav from './Nav';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Home from './HomeComponent/Home' 
import SellerLoginForm from './Forms/SellerLoginForm'
import CustomerLoginForm from './Forms/CustomerLoginForm'
import Items from './ItemDisplay/Items'
import PaymentForm from './Forms/PaymentForm'
import CardPay from './PaymentPaths/CardPay'
import WalletPay from './PaymentPaths/WalletPay'
import OrderSummary from './PaymentPaths/OrderSummary'
import SellerOrders from './SellerList/SellerOrders'
import ChangeStatus from './SellerList/ChangeStatus'
function App() {
  return (
    <Router>
    <div className="App">
      <Nav/>
      <Switch>
       <Route path = '/' exact component = { Home } />
       <Route path = '/SellerForm' component = { SellerLoginForm }/>
       <Route path = '/CustomerForm/:item' component = { CustomerLoginForm }/>
       <Route path = '/items' component = {Items}/>
       <Route path = '/PaymentForm/:customerId/:itemId' component={PaymentForm}/>
       <Route path = '/CardPath/:customerId/:itemId/:sellerId/:itemPrice' component = {CardPay}/>
       <Route path = '/WalletPath/:customerId/:itemId/:sellerId/:itemPrice/:walletMoney' component = {WalletPay}/>
       <Route path = '/Ordersummary/:customerId/:itemId/:sellerId/:itemPrice/:payment' component = {OrderSummary}/>
       <Route path = '/SellerOrders/:sellerId' component = {SellerOrders}/>
       <Route path = '/changeStatus/:sellerId/:id/:status' component = {ChangeStatus}/>
      </Switch>
    </div>
    </Router>
  );
}


export default App;
