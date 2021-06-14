import { configureStore } from '@reduxjs/toolkit'
import cardReducer from '../features/cardSlice'

export default configureStore({
    reducer: {
        product: cardReducer
    }
})