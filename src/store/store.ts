import { configureStore } from '@reduxjs/toolkit';
import {cartReducer} from "./cartReducer";
import {cardReducer} from "./cardReducer";

const store = configureStore({
    reducer: {
        card: cardReducer,
        cart: cartReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectCard = (state: any) => state.card;