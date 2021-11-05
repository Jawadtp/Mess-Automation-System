import {createSlice} from '@reduxjs/toolkit'
import { initialStateValue } from '../constants/constants'



export const userSlice = createSlice(
    {
        name: 'user',
        initialState: 
        {
            value: initialStateValue
            
        },
        reducers:
        {
            setUserInfo: (state, action) =>  //You may as well use a normal function here.
            {
                state.value = action.payload
            },

            removeUserInfo: (state, action) =>
            {
                state.value = initialStateValue
                localStorage.clear('token')
            }
        }

    })

export const {setUserInfo, removeUserInfo} = userSlice.actions

export default userSlice.reducer