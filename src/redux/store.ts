import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

const store = configureStore({
    reducer: {
        user: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;