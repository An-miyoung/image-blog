import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import 'index.css';
import Root from 'pages';



ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);


