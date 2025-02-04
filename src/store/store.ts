import { configureStore } from '@reduxjs/toolkit';
import {cartReducer} from "./cartReducer";
import {cardReducer} from "./cardReducer";
import {likeReducer} from "./likeReducer";

const store = configureStore({
    reducer: {
        card: cardReducer,
        cart: cartReducer,
        like: likeReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
