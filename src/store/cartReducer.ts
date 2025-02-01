import { createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {fetchCartData} from "./thunk.ts";
import {ICartItem} from "../mocs";

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

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);

            if (existingItem) {
                existingItem.amount += 1;  // Увеличиваем количество, если товар уже в корзине
                existingItem.price = existingItem.pricePerItem * existingItem.amount;  // считаем цену
            } else {
                state.items.push(item); // Добавляем товар, если его нет в корзине
            }
        },
        decreaseCart: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            state.items = state.items.map((item) => {
                if (item.id === id && item.amount > 1) {
                    item.amount -= 1; // Уменьшаем количество, если оно больше 1
                }
                return item;
            }).filter(item => item.amount > 0);  // Удаляем товары с нулевым количеством
        },
        /*removeItemFromCart: (state, action: PayloadAction<number>) => {
            // Удаление товара полностью из корзины
            state.items = state.items.filter((item) => item.id !== action.payload);
        },*/
        clearCart: (state) => {
            // Очистить корзину
            state.items = [];
        }

    },
});

export const { addToCart, decreaseCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
