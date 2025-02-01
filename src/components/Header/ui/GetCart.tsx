import {ICartItem, IGetCartProps} from "../../../mocs";
import style from "../../Header/ui/style.module.scss";
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";
import { addToCart, decreaseCart, clearCart } from "../../../store/cartReducer.ts";

export const GetCart = ({isActive, handleCartClose}: IGetCartProps, ) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // Уменьшение количества товара
    const handleDecreaseQuantity = (id: number) => {
        dispatch(decreaseCart(id));  // Уменьшаем количество товара
    };

    // Увеличение количества товара
    const handleIncreaseQuantity = (item: ICartItem) => {
        dispatch(addToCart(item));  // Увеличиваем количество товара
    };

    // Очистка корзины
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Подсчет общей стоимости
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    if (cartItems.length === 0) {
        return (
            <div className={clsx(style.cartPopup, isActive && style.cartActive)}>
                <p> В корзине 0 товаров </p>
                <button className={style.btn} onClick={handleCartClose}>Закрыть</button>
            </div>
        );
    }

    if (cartItems.length > 0) {
        return (
            <div className={clsx(style.cartPopup, isActive && style.cartActive)}>
                {cartItems.map((item) => (
                    <div className={style.cartItem} key={item.id}>
                        <p className={style.text}>{item.name}</p>
                        <p className={style.text}>{item.description}</p>
                        <p className={style.text}>{item.price}</p>
                        <div className={style.changeAmountWrapper}>
                            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                            <span>{item.amount}</span>
                            <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                        </div>
                    </div>
                ))}
                <div className={style.text}>
                    <p>Итоговая стоимость: ${totalPrice}</p>
                </div>
                <div>
                    <button onClick={handleClearCart} className={style.btn}>Очистить корзину</button>
                    <button className={style.btn} onClick={handleCartClose}>Закрыть</button>
                </div>
            </div>
        );
    }
}