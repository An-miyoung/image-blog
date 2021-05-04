import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Root from 'pages';
import { AppProvider } from "store";
import 'index.css';
import 'antd/dist/antd.css';


ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      < React.StrictMode>
          <Root />
      </React.StrictMode>
    </AppProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


