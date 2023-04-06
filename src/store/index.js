import { configureStore } from '@reduxjs/toolkit'
import activeStatusReducer from './activeStatusSlice'
import languageReducer from './languageSlice'


const store = configureStore({ 
    reducer: {
        activeStatus: activeStatusReducer,
        language: languageReducer 
    } 
})

export default store