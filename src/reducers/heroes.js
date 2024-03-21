import { createReducer } from "@reduxjs/toolkit"
import {
   heroesFetching,
   heroesFetched,
   heroesFetchingError,
   heroCreated,
   heroDeleted
} from '../actions';

const initialState = {
   heroes: [],
   heroesLoadingStatus: 'idle',
}

//укороченный вариант. работает только чистым жс. с тайпскрипт не работает.

//const heroes = createReducer(initialState, {
//   [heroesFetching]: state => { state.heroesLoadingStatus = 'loading'; },
//   [heroDeleted]: (state, action) => {
//      state.heroesLoadingStatus = 'idle';
//      state.heroes = action.payload;
//   },
//   [heroesFetchingError]: state => { state.heroesLoadingStatus = 'error' },
//   [heroCreated]: (state, action) => {
//      state.heroes.push(action.payload);
//   },
//   [heroDeleted]: (state, action) => {
//      state.heroes = state.heroes.filter(item => item.id !== action.payload);
//   }
//})

//креаредюсер работает только с креатеакшн и включает библиотеку иннерЖс.

const heroes = createReducer(initialState, builder => {
   builder.addCase(heroesFetching, state => {
      state.heroesLoadingStatus = 'loading';
   })
      .addCase(heroesFetched, (state, action) => {
         state.heroesLoadingStatus = 'idle';
         state.heroes = action.payload;
      })
      .addCase(heroesFetchingError, state => {
         state.heroesLoadingStatus = 'error';
      })
      .addCase(heroCreated, (state, action) => {
         state.heroes.push(action.payload);
      })
      .addCase(heroDeleted, (state, action) => {
         state.heroes = state.heroes.filter(item => item.id !== action.payload);
      })
});


export default heroes;