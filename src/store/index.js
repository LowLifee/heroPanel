import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';


const stringMiddleware = (store) => (next) => (action) => {
   if (typeof (action) === 'string') {
      return next({
         type: action
      })
   }

   return next(action);
}

const store = createStore(
   combineReducers({ filters, heroes }),
   compose(
      applyMiddleware(thunk, stringMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;