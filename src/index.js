import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components'
import './index.css';
import 'typeface-roboto'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
body {
  width:100%;
  padding: 70px 0;
  text-align: center;
  padding: 0;
  margin: auto;
  background:white;//#242d49;//311B92
  color:#63a3c9;
  font-family: Roboto;
  overflow-x: hidden;
  overflow-y:hidden;
}
`
ReactDOM.render(<App/>,document.getElementById('root'));
registerServiceWorker();
