import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "normalize.css";
import "./normalize.css"
import "./main.scss";
import { Provider } from "react-redux";
import { configureStore } from './model/appModel';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ configureStore() }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
