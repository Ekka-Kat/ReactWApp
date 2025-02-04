import axios from 'axios';
import { Dispatch } from 'redux';
import {ICartItem} from '../mocs'
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

export const addToCart = (item: ICartItem): ThunkResult<void> => async (dispatch: Dispatch<AddToCartAction>) => {
    try {
        const response = await axios.post(API_URL, item);
        dispatch({ type: 'ADD_TO_CART', payload: response.data });
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

export const removeFromCart = (id: number): ThunkResult<void> => async (dispatch: Dispatch<RemoveFromCartAction>) => {
    try {
        console.log('Deleting item with id:', id); // Логируем id
        await axios.delete(`${API_URL}/${id}`);
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};

export const clearCart = (): ThunkResult<void> => async (dispatch: Dispatch<ClearCartAction>) => {
    try {
        await axios.delete(`${API_URL}`);
        dispatch({ type: 'CLEAR_CART',  });
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};