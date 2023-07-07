import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import services from "../../services/services";
import { PremieresMain } from "../premiere/premieresInterface"; // используем интерфейс из premiere , для получения массива данных
import { InitialMainPage } from "./mainPageInterface";

// пришлось почти все скопировать в другом слайсе, потому-что нам приходит другой массив данных

const{transformObject} = services();


const initialState: InitialMainPage =  {
     mainBlockArray: [],
     mainBlockLoadingStatus: 'idle', 
     id: 0,
     caterories: 'Все фильмы'
}


export const fetchMainPage = createAsyncThunk<PremieresMain[], string>(
    'mainPage/fetchMainPage',
     async (url: string)=>{
      const response  = await transformObject(url);
      return response;
    }
)

const mainBlockSlice = createSlice({
    name: 'mainPage',
    initialState, 
    reducers: {
        idForCinema: (state: InitialMainPage, action: PayloadAction<number> ) => {
              localStorage.setItem('mainId', action.payload.toString());
              const saveMainId = localStorage.getItem('mainId') as string;
              state.id = +saveMainId;
        },

        changeСategory: (state: InitialMainPage, action: PayloadAction<string>) =>{
            state.caterories = action.payload
        }

    },

    extraReducers: (builder) => {
        builder
              .addCase(fetchMainPage.pending, (state: InitialMainPage) => { state.mainBlockLoadingStatus = 'loading'})
              .addCase(fetchMainPage.fulfilled, (state, action: PayloadAction<PremieresMain[]>) => {
                                      state.mainBlockLoadingStatus = 'idle';
                                      state.mainBlockArray = action.payload
            })
              .addCase(fetchMainPage.rejected, (state: InitialMainPage) => {state.mainBlockLoadingStatus =  'error'})
              .addDefaultCase(()=>{})
    },
})

export const {idForCinema, changeСategory} = mainBlockSlice.actions;
const mainBlockReduser = mainBlockSlice.reducer;

export default mainBlockReduser;