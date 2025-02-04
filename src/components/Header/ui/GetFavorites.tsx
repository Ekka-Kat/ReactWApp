import {ICartItem, IGetFavoriteProps} from "../../../mocs";
import style from "../../Header/ui/style.module.scss";
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";
import { removeFromFavorites, clearFavorites } from "../../../store/likeReducer.ts";
//import { addToCart} from "../../../store/cartReducer.ts";

export const GetFavorites = ({isActive, handleFavoritesClose}: IGetFavoriteProps, ) => {
    const dispatch = useDispatch();
    const likeItems = useSelector((state: RootState) => state.like.items);

    // Переносим товар в корзину
    const handleRemoveToCart = (item: ICartItem) => {
       // dispatch(addToCart(item));  // переносим в корзину
        dispatch(removeFromFavorites(item.id)); //удаляем из избранных
    };

    // Очищаем список избранных
    const handleClearFavorites = () => {
        dispatch(clearFavorites());
    };

    if (likeItems.length === 0) {
        return (
            <div className={clsx(style.cartPopup, isActive && style.likeActive)}>
                <p> Нет отложенных товаров</p>
                <button className={style.btn} onClick={handleFavoritesClose}>Закрыть</button>
            </div>
        );
    }

    if (likeItems.length > 0) {
        return (
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
        );
    }
}