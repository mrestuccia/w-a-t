import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './Routes';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//for oauth
if (document.location.search.indexOf('token=') === 1) {
  const token = document.location.search.slice(1).split('&')[0].split('token=')[1];
  window.localStorage.setItem('token', token);
  window.location = '/';
}


const root = document.getElementById('root');

const App = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

render(App, root);
