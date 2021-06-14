import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'

let storage = window.localStorage.getItem('Cart')

const initialState = {
    products: [],
    cartItems: JSON.parse(storage) || [],
    status: 'idle',
    error: false
}


export const getProducts = createAsyncThunk('products/getProducts', async function () {
    const response = await client.get('https://fakestoreapi.com/products')

    return response
})

export const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let item = state.products.filter(product => product.id === action.payload)
            // let addedItems = state.cartItems.filter(cartItem => cartItem.id === item.id)
            // if (addedItems === []) {
            //     state.cartItems = state.cartItems.concat(item)
            // }
            // else {
                
            // }
            state.cartItems = state.cartItems.concat(item)

            window.localStorage.setItem('Cart', JSON.stringify(state.cartItems))

        },
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.status = 'loading'
        },
        [getProducts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.products = state.products.concat(action.payload)
        },
        [getProducts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { addToCart } = cardSlice.actions

export default cardSlice.reducer