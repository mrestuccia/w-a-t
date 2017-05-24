import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './Routes';


const root = document.getElementById('root');

const App = (
  <Provider store = {store }>
    <Routes />
  </Provider>
);

render(App, root);
