import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import services from "../../services/services";
import { JenresHeader } from "./jenresheaderSliceInterface";
import { Transform } from "../../services/servicesInterface";


const{transformObject2} = services();



export const requestJenresHeader = createAsyncThunk<Transform, string>(
    'jenresHeader/requestJenresHeader', 
    async (url: string)=>{
        const response = transformObject2(url).
        then((result: Transform):Transform => {
            return result;
        })
      
        return response;
    }, 
   
    
)

const initialState: JenresHeader = {
    jenresData: [],
    jenresLoading: 'idle',
    pages: 1,
    total: 1, 
    url: '',
    page: 1
}


const jenresHeaderSlice = createSlice({
    name: 'jenresHeader',
    initialState: initialState,

    reducers:{
        countPage: (state: JenresHeader, action)=>{
            state.page = action.payload + 1;
        },
        zeroingPage: (state: JenresHeader)=>{
            state.page = 1;
        }
    },

    extraReducers: (builder)=>{
        builder
        .addCase(requestJenresHeader.pending, (state: JenresHeader) => { state.jenresLoading = 'loading'})
        .addCase(requestJenresHeader.fulfilled, (state: JenresHeader,  action)=> {
            state.jenresLoading = 'idle';
            state.jenresData = action.payload.docs;
            state.pages = action.payload.pages;
            state.page = action.payload.page;
            state.total = action.payload.total;
            state.url = action.meta.arg;
           
        })
        .addCase(requestJenresHeader.rejected, (state: JenresHeader)=>{
            state.jenresLoading = 'error'
        })
  
} 
});

export const jenresRedusers = jenresHeaderSlice.reducer;
export const{countPage, zeroingPage} =jenresHeaderSlice.actions;