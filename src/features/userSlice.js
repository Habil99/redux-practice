import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../libs/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { provider } from "../libs/firebase";

const initialState = {
    user: null,
    errorCode: '',
    errorMessage: null,
    status: 'idle'
}

export const setUser = createAsyncThunk('user/setUser', async (payload) => {
    const response = await auth.signInWithEmailAndPassword(payload.email, payload.password)

    return response
})

export const authGoogleUser = createAsyncThunk('user/authGoogleUser', async () => {
    const response = await auth.signInWithPopup(provider)

    return response
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // setUser: async (state, { payload }) => {
        //     console.log(payload.email, payload.password)
        //     await auth.signInWithEmailAndPassword(payload.email, payload.password)
        //         .then(userCredential => {
        //             state.user = userCredential.user
        //             console.log(userCredential.user)
        //         })
        //     // .catch(error => {
        //     //     state.errorCode = error.errorCode
        //     //     state.errorMessage = error.errorMessage
        //     // })
        // }
    },
    extraReducers: {
        [setUser.pending]: state => {
            state.status = 'loading'
        },
        [setUser.fulfilled]: (state, { payload }) => {
            state.user = payload.user
            state.status = 'succeeded'
        },
        [setUser.rejected]: (state, { error }) => {
            state.errorMessage = error.message
            state.status = 'failed'
        },
        [authGoogleUser.pending]: state => {
            state.status = 'loading'
        },
        [authGoogleUser.fulfilled]: (state, { payload }) => {
            state.user = payload.user
            console.log(payload)
            state.status = 'succeeded'
        },
        [authGoogleUser.rejected]: (state, { error }) => {
            state.errorMessage = error.message
            console.log(error)
            state.status = 'failed'
        }
    }

})

// export const { setUser } = userSlice.actions

export default userSlice.reducer