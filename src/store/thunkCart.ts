import axios from 'axios';
import { Dispatch } from 'redux';
import {ICartItem} from '../types'
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
const API_URL = 'https://6799dc16747b09cdccccc46c.mockapi.io/api/v1/cart';

// Типизация Action
export interface AddToCartAction {
    type: 'ADD_TO_CART';
    payload: ICartItem;
}

export interface RemoveFromCartAction {
    type: 'REMOVE_FROM_CART';
    payload: number; // ID товара
}

export interface ClearCartAction {
    type: 'CLEAR_CART';
}

type CartActions = AddToCartAction | RemoveFromCartAction | ClearCartAction;

type ThunkResult<R> = ThunkAction<R, RootState, unknown, CartActions>;

export const fetchCart = () => async (dispatch: Dispatch) => {
    dispatch({ type: 'FETCH_CART_REQUEST' });
    try {
        const response = await axios.get(API_URL);
        dispatch({ type: 'FETCH_CART_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_CART_FAILURE', error });
    }
};

export const addToCart = (item: ICartItem): ThunkResult<void> => async (dispatch, getState) => {
    try {
        const state = getState();
        const existingItem = state.cart.items.find((i:ICartItem) => Number(i.id) === Number(item.id));
        console.log('Thunk addToCart, state.cart', state.cart);
        console.log('existingItem', existingItem);

        if (existingItem) {
            // Если товар есть, отправляем PUT-запрос для обновления
            const updatedItem = { ...item, amount: item.amount + 1, price: item.pricePerItem * (item.amount + 1)};
            const response = await axios.put(`${API_URL}/${item.id}`, updatedItem);
            dispatch({ type: 'ADD_TO_CART', payload: response.data });
        } else {
            // Если товара нет, отправляем POST-запрос
            const response = await axios.post(API_URL, item);
            dispatch({ type: 'ADD_TO_CART', payload: response.data });
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

export const removeFromCart = (item: ICartItem): ThunkResult<void> => async (dispatch: Dispatch<RemoveFromCartAction>) => {
    try {
        if (item.amount>1) {
            const updatedItem = { ...item, amount: item.amount - 1, price: item.pricePerItem * (item.amount - 1)};
            await axios.put(`${API_URL}/${item.id}`, updatedItem);
            dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
        } else {
            await axios.delete(`${API_URL}/${item.id}`);
            dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};

export const clearCart = (): ThunkResult<void> => async (dispatch: Dispatch<ClearCartAction>) => {
    try {
        const response = await axios.get(`${API_URL}`);
        const cartItems: { id: string }[] = response.data;

        // Удаляем каждый товар отдельно
        await Promise.all(cartItems.map(item => axios.delete(`${API_URL}/${item.id}`)));
        dispatch({ type: 'CLEAR_CART' });

    } catch (error) {
        console.error('Error clearing cart:', error);
    }
};