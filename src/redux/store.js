import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import userReducer from './reducers/userReducer';
import groupReducer from './reducers/groupReducer';
import friendReducer from './reducers/friendReducer';


const combined = combineReducers({
  products: productsReducer,
  user: userReducer,
  groups: groupReducer,
  friends: friendReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
