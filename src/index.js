import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <App />
    </Switch>
  </Router>, document.getElementById('root'));
registerServiceWorker();
