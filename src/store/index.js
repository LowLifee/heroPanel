import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/heroesFilterSlice';
import heroes from '../components/heroesList/heroesSlice';
import { apiSlice } from '../api/apiSlice';


const stringMiddleware = (store) => (next) => (action) => {
   if (typeof (action) === 'string') {
      return next({
         type: action
      })
   }

   return next(action);
}

const store = configureStore({
   reducer: {
      filters,
      heroes,
      [apiSlice.reducerPath]: apiSlice.reducer
   },
   middleware: getDefaultMiddleWare => getDefaultMiddleWare().concat(stringMiddleware, apiSlice.middleware),
   devTools: process.env.NODE_ENV !== 'production'
})


export default store;