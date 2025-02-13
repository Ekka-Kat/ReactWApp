import {ICartProps} from "../../../mocs";
import {GetCart} from "./GetCart";
import {useState} from "react";
import style from "../../Header/ui/style.module.scss";

export const Header = ({cart}:ICartProps) => {

    const [activeCart, setActiveCart] = useState(false);

    const handleCartClick =() => {
        setActiveCart(!activeCart);
        console.log('isActive при нажатии кнопки корзины', activeCart);
    }

    return (
        <div className={style.headerWrapper}>
            <p className={style.logo}>IShop</p>
            <button className={style.btn} onClick={handleCartClick}>Корзина</button>
            <GetCart currentCart={cart} isActive={activeCart} handleCartClose={handleCartClick}/>
        </div>
    )
}
