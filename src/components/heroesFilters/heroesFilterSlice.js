import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
   activeFilter: 'all',
   filtersLoadingStatus: 'idle'
})

export const fetchFiltered = createAsyncThunk(
   'heroesFilterSlice/fetchFiltered',
   async () => {
      const { request } = useHttp();
      return await request("http://localhost:3001/filters");
   }
)

const heroesFilterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      filtersFetchingError: state => { state.filtersLoadingStatus = 'error' },
      activeFilterChanged: (state, action) => { state.activeFilter = action.payload; }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchFiltered.pending, state => { state.filtersLoadingStatus = 'loading'; })
         .addCase(fetchFiltered.fulfilled, (state, action) => {
            state.filtersLoadingStatus = 'idle';
            filtersAdapter.setAll(state, action.payload);
         })
         .addCase(fetchFiltered.rejected, state => { state.filtersLoadingStatus = 'error' })
         .addDefaultCase(() => { })
   }
})

const { actions, reducer } = heroesFilterSlice;

export const { selectAll } = filtersAdapter.getSelectors(state => state.filters);

export default reducer;

export const {
   filtersFetching,
   filtersFetched,
   filtersFetchingError,
   activeFilterChanged
} = actions;