import {ICartItem} from "../types";

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

type CartAction =
    | {type: 'FETCH_CART_REQUEST'}
    | {type: 'FETCH_CART_SUCCESS'; payload: ICartItem[]}
    | {type: 'FETCH_CART_FAILURE'; error: string}
    | {type: 'ADD_TO_CART'; payload: ICartItem}
    | {type: 'REMOVE_FROM_CART'; payload: number}
    | {type: 'CLEAR_CART'}

export const cartReducer = (state = initialState, action: CartAction) => {
    switch (action.type) {
        case 'FETCH_CART_REQUEST':
            return {...state, loading: true};
        case 'FETCH_CART_SUCCESS':
            return {...state, loading: false, items: action.payload};
        case 'FETCH_CART_FAILURE':
            return {...state, loading: false, error: action.error};
        case 'ADD_TO_CART': {
            const item = action.payload;
            const existingItemIndex = state.items.findIndex((i) => Number(i.id) == Number(item.id));
            console.log('existingItemIndex', existingItemIndex);

            if (existingItemIndex !== -1) {
                // Если товар уже есть в корзине, обновляем его количество и цену
                return {
                    ...state,
                    items: state.items.map((i, index) =>
                        index === existingItemIndex
                            ? {
                                ...i,
                                amount: i.amount + 1, // Увеличиваем количество
                                price: i.pricePerItem * (i.amount + 1), // Пересчитываем цену
                            }
                            : i
                    ),
                };
            }
            else {
                // Если товара нет в корзине, добавляем его
                return {
                    ...state,
                    items: [...state.items, { ...item, amount: 1, price: item.pricePerItem }],
                };
            }
        }
        case 'REMOVE_FROM_CART':
            console.log("REMOVE_FROM_CART. Action Payload:", action.payload);
            return {
                ...state,
                items: [...state.items]
                    .map((item) => {
                        if (item.id === action.payload && item.amount > 0)
                        {
                            console.log('item.id', item.id);
                           return {
                           ...item,
                            amount: item.amount - 1,
                            price: item.pricePerItem * (item.amount - 1), // Обновляем цену
                            };
                        }
                        return {...item};
                   })
                   .filter((item) => item.amount > 0), // Удаляем товары с нулевым количеством
            };
        case 'CLEAR_CART':
            return {
                ...state,
                items: [], // Очищаем корзину
            };
        default:
            return state;
    }
};

