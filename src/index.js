import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './Redux/configStore';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <App />
</Provider>
);
reportWebVitals();


