import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import Routes from "./router/routes";

ReactDOM.render(
<BrowserRouter>
    <Routes />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
