import {ICartItem, IGetCartProps} from "../../../mocs";
import style from "../../Header/ui/style.module.scss";
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../../../store/store.ts";
import {useEffect} from "react";
import { fetchCart, addToCart, removeFromCart, clearCart } from "../../../store/thunkCart.ts"

export const GetCart = ({isActive, handleCartClose}: IGetCartProps, ) => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    useEffect(() => {
        dispatch(fetchCart() as any)
    }, [dispatch]);

    // Уменьшение количества товара
    const handleDecreaseQuantity = (id: number) => {
        dispatch(removeFromCart(id)); // Уменьшаем количество товара
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
    const totalPrice = cartItems.reduce((total: number, item: ICartItem) => total + item.price, 0);

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
                {cartItems.map((item: ICartItem) => (
                    <div className={style.cartItem} key={item.id}>
                        <p className={style.title}>{item.name}</p>
                        <p className={style.text}>{item.description}</p>
                        <div className={style.priceAmountWrapper}>
                        <p className={style.text}>{item.price} ₽</p>
                        <div className={style.changeAmountWrapper}>
                            <button className={style.btnIncDec} onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                            <span className={style.text}>{item.amount}</span>
                            <button className={style.btnIncDec} onClick={() => handleIncreaseQuantity(item)}>+</button>
                        </div>
                        </div>
                    </div>
                ))}
                <div className={style.text}>
                    <p>Итоговая стоимость:{totalPrice} ₽</p>
                </div>
                <div className={style.closeClearWrapper}>
                    <button onClick={handleClearCart} className={style.btn}>Очистить корзину</button>
                    <button className={style.btn} onClick={handleCartClose}>Закрыть</button>
                </div>
            </div>
        );
    }
}