import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import groupReducer from './reducers/groupReducer';
import friendReducer from './reducers/friendReducer';


const combined = combineReducers({
  user: userReducer,
  groups: groupReducer,
  friends: friendReducer
});

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store;

if (reduxDevtools) {
    store = createStore(combined, reduxDevtools(applyMiddleware(thunk)));
} else {
    store = createStore(combined, applyMiddleware(thunk));
}

export default store;
