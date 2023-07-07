import {configureStore} from '@reduxjs/toolkit';
import premieresReduser from '../premiere/premiereSlise';
import mainBlockReduser from '../mainPage/mainPageSlice';
import { headerSliseReduser } from '../headerSlice/headerSlice';
import { jenresRedusers } from '../jenresHeaderSlice/jenresHeaderSlice';



const store = configureStore({
    reducer: {
        premiere: premieresReduser,
        mainBlock: mainBlockReduser,
        headerSearch: headerSliseReduser,
        jenres: jenresRedusers
    }, 
})
export type AppDispatch = typeof store.dispatch;

export default store;