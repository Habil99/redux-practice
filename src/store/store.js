import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import cardReducer from '../features/cardSlice'
import userSlice from '../features/userSlice'

export default configureStore({
    reducer: {
        product: cardReducer,
        user: userSlice
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['user/setUser/fulfilled'],
        }
    })
})