import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import services from "../../services/services";
import { Inital, PremieresMain } from "./premieresInterface";


const {transformObject} = services();

const initialState: Inital = {
    premieres: [],
    premieresLoadingStatus: 'idle'
}


export const fetchPremieres = createAsyncThunk<PremieresMain[], string>(
    'premieres/fetchPremieres',
     async (url: string)=>{
      const response  = await transformObject(url);
      return response;
    }
)

 
const premierSlice = createSlice({
    name: 'premieres',
    initialState, 
    reducers: {

    },

    extraReducers: (builder) => {
        builder
              .addCase(fetchPremieres.pending, (state: Inital) => { state.premieresLoadingStatus = 'loading'})
              .addCase(fetchPremieres.fulfilled, (state, action: PayloadAction<PremieresMain[]>) => {
                                      state.premieresLoadingStatus = 'idle';
                                      state.premieres = action.payload
            })
              .addCase(fetchPremieres.rejected, (state: Inital) => {state.premieresLoadingStatus =  'error'})
              .addDefaultCase(()=>{})
    },
})

const premieresReduser = premierSlice.reducer;

export default premieresReduser;





