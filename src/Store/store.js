import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

//import slices
import authSlice from "./authSlice";
import dialogSlice from "./dialogSlice";
import drawerSlice from "./drawerSlice";
import forceRefreshSlice from "./forceRefreshSlice";
import messageSlice from "./messageSlice";


const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, authSlice.reducer)

export const store = configureStore({
    middleware: [thunk],
    reducer: {
        auth: persistedReducer,
        dialog: dialogSlice.reducer,
        leftDrawer: drawerSlice.reducer,
        forceRefresh: forceRefreshSlice.reducer,
        message: messageSlice.reducer
    },

})

export const persistor = persistStore(store)






