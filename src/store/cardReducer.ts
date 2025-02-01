import { createSlice} from '@reduxjs/toolkit';
import {fetchCardData} from "./thunk.ts";
import {ICard} from "../mocs";


interface CardState {
    data: ICard[];
    loading: boolean;
    error: string | null;
}

const initialState: CardState = {
    data: [],
    loading: false,
    error: null,
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCardData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCardData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch';
            });
    },
});

export const cardReducer = cardSlice.reducer;