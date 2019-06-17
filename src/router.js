import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import CustomerPage from './routes/CustomerPage'
import OrderLinePage from './routes/OrderLinePage'
import OrderPage from './routes/OrderPage'
import CustomerDetails from './routes/CustomerDetails'
import ProductPage from './routes/ProductPage'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <IndexPage>
          <Route path="/orderLine" component={OrderLinePage} />
          <Route path="/customer" component={CustomerPage} />
          <Route path="/order" component={OrderPage} />
          <Route path="/customerDetails" exact component={CustomerDetails} />
          <Route path="/product" exact component={ProductPage} />
        </IndexPage>
      </Switch>
    </Router>

  );
}

export default RouterConfig;
