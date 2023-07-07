import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { HeaderInfoSearch } from "./headerSliceInterface";
import services from "../../services/services";
import { KinoBdLoading, TransformKinoLoading } from "../../services/servicesInterface";


const initialState: HeaderInfoSearch = {
    headerData: [],
    headerLoader: 'idle',
}

const{request2} = services();

export const requestHeaderSearch = createAsyncThunk<TransformKinoLoading[], string>(
    'headerSearch/requestHeaderSearch', 
    async (url: string)=>{
        const response = await request2(url).
        then((result: KinoBdLoading): TransformKinoLoading[]=> {
            return result.data
        })
        return response;
    }
)


const headerSlice = createSlice({
    name: 'headerSearch',
    initialState,
    reducers:{

    },

    extraReducers: (builder)=>{
        builder
        .addCase(requestHeaderSearch.pending, (state: HeaderInfoSearch) => { state.headerLoader = 'loading'})
        .addCase(requestHeaderSearch.fulfilled, (state: HeaderInfoSearch, action: PayloadAction<TransformKinoLoading[]>)=> {
            state.headerLoader = 'idle'
            state.headerData = action.payload
        })
        .addCase(requestHeaderSearch.rejected, (state: HeaderInfoSearch)=>{
            state.headerLoader = 'error'
        })
  
} 
});

export const headerSliseReduser = headerSlice.reducer;



