import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tag: undefined,
    timesheet: undefined,
}

const forceRefreshSlice = createSlice({
    name: "force refresh Slice",
    initialState,
    reducers: {
        refresh: (state,payload) => {
            state[payload?.payload] = Math.random()
        },
    }
})

export const forceRefreshActions = forceRefreshSlice.actions
export default forceRefreshSlice