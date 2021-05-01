import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Root from 'pages';
import 'index.css';
import 'antd/dist/antd.css';




ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);


