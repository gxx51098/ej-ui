import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import CustomerPage from './routes/CustomerPage'

import OrderPage from './routes/OrderPage'
import CustomerDetails from './routes/CustomerDetails'
import ProductDetails from './routes/ProductDetails'
import ProductPage from './routes/ProductPage'
import WaiterPage from './routes/WaiterPage'
import CommentPage from './routes/CommentPage'
import CategoryPage from './routes/CategoryPage'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <IndexPage>
      
          <Route path="/customer" component={CustomerPage} />
          <Route path="/order" component={OrderPage} />
          <Route path="/customerDetails" exact component={CustomerDetails} />
          <Route path="/productDetails" exact component={ProductDetails} />
          <Route path="/product" exact component={ProductPage} />
          <Route path="/comment" component={CommentPage} />   
          <Route path="/category" component={CategoryPage} /> 
          <Route path="/waiter" component={WaiterPage} />  
        </IndexPage>
      </Switch>
    </Router>

  );
}

export default RouterConfig;
