import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";



const initialState = {
   filters: [],
   filtersLoadingStatus: 'idle',
   activeFilter: 'all'
}

export const fetchFiltered = createAsyncThunk(
   'heroesFilterSlice/fetchFiltered',
   async () => {
      const { request } = useHttp();
      request("http://localhost:3001/filters")
   }

)





const heroesFilterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      filtersFetching: state => { state.filtersLoadingStatus = 'loading'; },
      filtersFetched: (state, action) => {
         state.filtersLoadingStatus = 'idle';
         state.filters = action.payload;
      },
      filtersFetchingError: state => { state.filtersLoadingStatus = 'error' },
      activeFilterChanged: (state, action) => { state.activeFilter = action.payload; }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchFiltered.pending, state => { state.filtersLoadingStatus = 'loading'; })
         .addCase(fetchFiltered.fulfilled, (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
         })
         .addCase(fetchFiltered.rejected,)
   }
})

const { actions, reducer } = heroesFilterSlice;

export default reducer;

export const {
   filtersFetching,
   filtersFetched,
   filtersFetchingError,
   activeFilterChanged
} = actions;