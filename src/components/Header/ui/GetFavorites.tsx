import {ICartItem, IGetFavoriteProps} from "../../../types";
import style from "../../Header/ui/style.module.scss";
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites, clearFavorites } from "../../../store/likeReducer.ts";
import {addToCart} from "../../../store/thunkCart.ts";
import { AppDispatch } from '../../../store/store.ts';
import {getLikeItems} from "../../../store/selector.ts";


export const GetFavorites = ({isActive, handleFavoritesClose}: IGetFavoriteProps, ) => {
    const dispatch = useDispatch<AppDispatch>();
    const likeItems: ICartItem[] = useSelector(getLikeItems);

    // Переносим товар в корзину
    const handleRemoveToCart = (item: ICartItem) => {
        const itemToCart: ICartItem = { ...item, pricePerItem: item.price, amount: 1 }
        dispatch(addToCart(itemToCart));
        dispatch(removeFromFavorites(item.id));
    };

    // Очищаем список избранных
    const handleClearFavorites = () => {
        dispatch(clearFavorites());
    };

    return (
        <>
           {!likeItems.length && (
               <div className={clsx(style.cartPopup, isActive && style.likeActive)}>
                   <p> Нет отложенных товаров</p>
                   <button className={style.btn} onClick={handleFavoritesClose}>Закрыть</button>
               </div>
           )}
            {likeItems.length > 0 && (
                <div className={clsx(style.cartPopup, isActive && style.cartActive)}>
                    {likeItems.map((item) => (
                        <div className={style.cartItem} key={item.id}>
                            <p className={style.text}>{item.name}</p>
                            <p className={style.text}>{item.description}</p>
                            <p className={style.text}>{item.price} ₽</p>
                            <button className={style.btn} onClick={() => handleRemoveToCart(item)}>В корзину</button>
                        </div>
                    ))}
                    <div>
                        <button onClick={handleClearFavorites} className={style.btn}>Очистить список</button>
                        <button className={style.btn} onClick={handleFavoritesClose}>Закрыть</button>
                    </div>
                </div>
            )}
        </>
    )
}