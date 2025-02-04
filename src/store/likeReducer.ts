import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICartItem} from "../mocs";

interface LikeState {
    items: ICartItem[];
    loading: boolean;
    error: string | null;
}

const initialState: LikeState = {
    items: [],
    loading: false,
    error: null,
};

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<ICartItem>) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);

            if (!existingItem) {
                state.items.push(item); // Добавляем товар, если его нет в избранных
            }
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            // Удаление товара из избранных
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearFavorites: (state) => {
            state.items = []; // Очистить корзину
        }

    },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = likeSlice.actions;
export const likeReducer = likeSlice.reducer;
