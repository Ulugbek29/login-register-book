import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/auth.slice"


const persisitAuthConfig={
    key: "auth",
    storage
}



export const rootReducer = combineReducers({
    auth: persistReducer(persisitAuthConfig, authReducer),
})