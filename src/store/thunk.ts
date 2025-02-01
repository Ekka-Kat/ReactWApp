import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchCardData = createAsyncThunk('fetchCardData', async () => {
    const response = await fetch('https://mocki.io/v1/96b898ae-de0c-4d17-b17a-3ded4094eb4b');
    return await response.json();
});