import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'
import { getMatches } from '../helpers/matching'

const initialState = {
    products: [],
    status: 'idle',
    error: false,
}

const URL = 'https://fakestoreapi.com/products'

export const getProducts = createAsyncThunk('products/getProducts', async function () {
    // const $limit = limit || 6
    const response = await client.get(URL)
    return response
})

// export const getSingleProduct = createAsyncThunk('products/getSingleProduct', async ({ id }) => {
//     const response = await client.get(`https://fakestoreapi.com/products/${id}`)
//     return response
// })

export const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let matchingProducts = getMatches(state, action.payload);

            matchingProducts.map(product => {
                product.inTheCart = true
                product.count++
                switch (product.inTheFav) {
                    case true:
                        product.totalPrice += Number(product.discountedPrice)
                        break;
                    default:
                        product.totalPrice += Number(product.price)
                        break;
                }
                return product;
            })
        },
        sortByDesc: (state, { payload }) => {
            let sortType = payload
            if (sortType === 'asc') {
                state.products.sort((a, b) => a.price < b.price)
            } else if (sortType === 'desc') {
                state.products.sort((a, b) => a.price > b.price)
            }
        },
        toggleFavourites: (state, { payload }) => {
            let id = payload
            let matchingProducts = getMatches(state, id)

            matchingProducts.map(product => {
                product.inTheFav = !product.inTheFav
                return product
            })
        }
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.status = 'loading'
        },
        [getProducts.fulfilled]: (state, action) => {
            state.status = 'succeeded'

            const data = [...action.payload].map(prod => {
                let discounted = parseInt(prod.price) - parseInt(prod.price) / 100 * 15
                return {
                    ...prod,
                    inTheCart: false,
                    count: 0,
                    totalPrice: 0,
                    inTheFav: false,
                    discountedPrice: discounted.toFixed(2)
                }
            })

            state.products = state.products.concat(data)
        },
        [getProducts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    }
})

export const { addToCart, sortByDesc, toggleFavourites } = cardSlice.actions

export default cardSlice.reducer
