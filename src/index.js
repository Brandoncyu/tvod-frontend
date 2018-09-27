import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

const storeInstance = store();

ReactDOM.render(
  <Provider store={storeInstance}>
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
