import { configureStore } from '@reduxjs/toolkit'
import activeStatusReducer from './activeStatusSlice'


const store = configureStore({ 
    reducer: {
        activeStatus: activeStatusReducer 
    } 
})

export default store