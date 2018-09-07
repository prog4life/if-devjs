import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';

import InvoicesPageContainer from 'containers/InvoicesPageContainer';
import AddInvoicePage from 'components/AddInvoicePage';
import EditInvoicePage from 'components/EditInvoicePage';
import NotFoundPage from 'components/NotFoundPage';

setConfig({ logLevel: 'error' }); // ['debug', 'log', 'warn', 'error'(default)]

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={InvoicesPageContainer} />
        <Route path="/add" component={AddInvoicePage} />
        <Route path="/edit/:id" component={EditInvoicePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
};

// export default hot(module)(App);
export default process.env.NODE_ENV === 'production' ? App : hot(module)(App);
