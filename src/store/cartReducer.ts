import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types';

interface CartState {
    items: ICartItem[];
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
};
// Создаем действия
const fetchCartRequest = createAction('FETCH_CART_REQUEST');
const fetchCartSuccess = createAction<ICartItem[]>('FETCH_CART_SUCCESS');
const fetchCartFailure = createAction<string>('FETCH_CART_FAILURE');
const addToCart = createAction<ICartItem>('ADD_TO_CART');
const removeFromCart = createAction<number>('REMOVE_FROM_CART');
const clearCart = createAction('CLEAR_CART');


export const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchCartRequest, (state) => {
            state.loading = true;
        })
        .addCase(fetchCartSuccess, (state, action: PayloadAction<ICartItem[]>) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchCartFailure, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addToCart, (state, action: PayloadAction<ICartItem>) => {
            const item = action.payload;
            const existingItemIndex = state.items.findIndex((i) => Number(i.id) === Number(item.id));

            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].amount += 1;
                state.items[existingItemIndex].price = state.items[existingItemIndex].pricePerItem * state.items[existingItemIndex].amount;
            } else {
                state.items.push({ ...item, amount: 1, price: item.pricePerItem });
            }
        })
        .addCase(removeFromCart, (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            const itemIndex = state.items.findIndex((i) => i.id === itemId);

            if (itemIndex !== -1 && state.items[itemIndex].amount > 0) {
                state.items[itemIndex].amount -= 1;
                state.items[itemIndex].price = state.items[itemIndex].pricePerItem * state.items[itemIndex].amount;

                if (state.items[itemIndex].amount === 0) {
                    state.items.splice(itemIndex, 1);
                }
            }
        })
        .addCase(clearCart, (state) => {
            state.items = [];
        });
});

