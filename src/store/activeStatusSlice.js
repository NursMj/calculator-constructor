import { createSlice } from "@reduxjs/toolkit"

const activeStatusSlice = createSlice({
    name: 'activeStatus',
    initialState: {
        activeStatus: false
    },
    reducers: {
        changeActiveStatus(state) {
            state.activeStatus = !state.activeStatus
        }
    }
})

export const {changeActiveStatus} = activeStatusSlice.actions
export default activeStatusSlice.reducer