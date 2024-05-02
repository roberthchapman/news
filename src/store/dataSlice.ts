
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { INewsItemData } from '../models/newsItemData'
import { IAppState } from './data-state'
import axios from 'axios'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [] as INewsItemData[],
    status: 'idle',
    page: 1,
    starred: [] as string[],
    uiMode: "light",
    displayMode: "latest"
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    toggleStarred: (state, action) => {
      if(state.starred.includes(action.payload)){
          state.starred = state.starred.filter(x => x !== action.payload);
      } else {
          state.starred.push(action.payload);
      }
    },
    toggleUIMode: (state) => {
      state.uiMode = state.uiMode === "latest" ? "starred" : "latest"
    },
    setDisplayMode: (state, action) => {
      state.displayMode = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDataAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchDataAsync.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})

export const { toggleStarred, setPage, toggleUIMode, setDisplayMode } = dataSlice.actions

export interface IParams {
  page: number;
  pageSize: number;
}

export const fetchDataAsync = createAsyncThunk('data/fetchData', async (params: IParams) => {
  const {page, pageSize} = params;
  const response = await axios.get(`http://hn.algolia.com/api/v1/search_by_date?page=${page}&hitsPerPage=${pageSize}`)
  return response.data.hits
})

export const selectData = (state: IAppState) => state.data.data
export const selectDataById = (state: IAppState, id: string) => state.data.data.find(x => x.objectID === id)
export const selectStatus = (state: IAppState) => state.data.status
export const selectStarred = (state: IAppState) => state.data.starred
export const selectPage = (state: IAppState) => state.data.page
export const selectDisplayMode = (state: IAppState) => state.data.displayMode
export const selectUIMode = (state: IAppState) => state.data.uiMode

export default dataSlice.reducer
