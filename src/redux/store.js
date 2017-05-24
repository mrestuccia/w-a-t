import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import userReducer from './reducers/userReducer';
import groupReducer from './reducers/groupReducer';


const combined = combineReducers({
  products: productsReducer,
  user: userReducer,
  groups: groupReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
