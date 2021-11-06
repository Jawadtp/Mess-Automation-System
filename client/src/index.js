
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Sidebar from './sidebar';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import userReducer from './features/user'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore(
  {
    reducer: 
    {
      user: userReducer,
    }
  })


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <Sidebar />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
