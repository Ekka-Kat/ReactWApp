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

/*const cartSlice = createSlice({
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
                    if (item.id === id && item.amount > 0) {
                        return { ...item, amount: item.amount - 1, price: item.pricePerItem * (item.amount - 1) };
                    }
                    return item;
                })
                .filter(item => item.amount > 0);  // Удаляем товары с нулевым количеством
        },
        clearCart: (state) => {
            // Очистить корзину
            state.items = [];
        }
    },
});*/

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CART_REQUEST':
            return {...state, loading: true};
        case 'FETCH_CART_SUCCESS':
            return {...state, loading: false, items: action.payload};
        case 'FETCH_CART_FAILURE':
            return {...state, loading: false, error: action.error};
        case 'ADD_TO_CART': {
            const item = action.payload;
            const existingItemIndex = state.items.findIndex((i) => i.id === item.id);

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
            } else {
                // Если товара нет в корзине, добавляем его
                return {
                    ...state,
                    items: [...state.items, { ...item, amount: 1, price: item.pricePerItem }],
                };
            }
        }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items
                    .map((item) => {
                        if (item.id === action.payload.id && item.amount > 0)
                        {
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

