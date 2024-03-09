import { createSlice } from "@reduxjs/toolkit";




 const authCheck = createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        userData: {}
    },
    reducers: {
        login: (state,{payload})=> {
            console.log(payload);
            state.isAuth = true,
            state.userData = payload
        },
        logout: (state)=> {
            state.isAuth = false
            state.userData = {}
        }
    }
}) 

export default authCheck.reducer;

export const {login, logout} = authCheck.actions
