import {configureStore} from '@reduxjs/toolkit'
import {FLUSH,REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE, persistStore} from 'redux-persist'
import reduxStorage from './storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { rootReducers } from './rootReducers'

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    blacklist: [],
    whitelist: ['tasks']
}

const persistedReducers = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducers,
    middleware:  getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck : {
                ignoredActions : [FLUSH,REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE]
            }
        })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch