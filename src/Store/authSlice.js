import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
}

const authSlice = createSlice({
    name: "Auth Slice",
    initialState,
    reducers: {
        login: (state, payload) => {
            state.status = true
            state.username = payload.payload?.username
            state.role = payload.payload?.role
            state.userID = payload.payload?.userID
        },
        logout: (state, payload) => {
            state.status = false
            state.username = undefined
            state.role = undefined
            state.userID = undefined
        },
    }
})

export const authActions = authSlice.actions
export default authSlice