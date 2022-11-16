import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import user from './slice.user';
import alert from './slice.alert';
import group from './slice.group';
import raid from './slice.raid';

const reducers = combineReducers({
    user: user.reducer, 
    alert: alert.reducer, 
    group: group.reducer, 
    raid: raid.reducer, 
});

const persistConfig = {
    key: 'root', 
    storage: storage, 
    blacklist: [ 
        // 'alert', 
    ], //유지시키지 않을 리스트
    // whitelist: [ 'group' ], 
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer, 
    // devTools: 
    middleware: [thunk], 
});

export default store;