import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('container'));