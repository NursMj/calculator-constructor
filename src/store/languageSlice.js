import { createSlice } from "@reduxjs/toolkit"

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        language: true
    },
    reducers: {
        changeLanguage(state) {
            state.language = !state.language
        }
    }
})

export const {changeLanguage} = languageSlice.actions
export default languageSlice.reducer