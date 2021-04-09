import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../firebase';
import { RootState } from '../store';
import { User, AuthState } from '../interfaces'


const initialState: AuthState = {
    user: null,
    loading: false
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state) => {
            auth.signOut();
            state.user = null
        }
    }
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.user.user;

export default authSlice.reducer;