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
            state.shopID = payload.payload?.shopID
        },
        logout: (state, payload) => {
            state.status = false
            state.username = undefined
            state.role = undefined
            state.userID = undefined
            state.shopID = undefined
        },
    }
})

export const authActions = authSlice.actions
export default authSlice