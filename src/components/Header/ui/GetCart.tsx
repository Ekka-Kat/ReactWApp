import {IGetCartProps} from "../../../mocs";
import style from "../../Header/ui/style.module.scss";
import clsx from 'clsx';

export const GetCart = ({currentCart, isActive, handleCartClose}: IGetCartProps, ) => {
    if (!currentCart) {
        return (
            <div>
                <p className={style.text}>Ошибка при чтении корзины</p>
            </div>)
    }
    if (currentCart.length === 0) {
        console.log(clsx(style.cartPopup, isActive && style.cartActive));
        return (
            <div className={clsx(style.cartPopup, isActive && style.cartActive)}>
                <p> В корзине 0 товаров </p>
                <button className={style.btn} onClick={handleCartClose}>Закрыть</button>
            </div>
        );
    }
    else {
        console.log('isActive при рендере корзины', isActive);
        return (
            <div className={clsx(style.cartPopup, isActive && style.cartActive)}>
                {currentCart.map((item) => (
                    <div className={style.cartItem} key={item.id}>
                        <p className={style.text}>{item.name}</p>
                        <p className={style.text}>{item.description}</p>
                        <p className={style.text}>{item.price}</p>
                        <p className={style.text}>{item.amount}</p>
                    </div>
                ))}
                <button className={style.btn} onClick={handleCartClose}>Закрыть</button>
            </div>
        );
    }
}