import {GetCart} from "./GetCart";
import {useState} from "react";
import style from "../../Header/ui/style.module.scss";
import {GetFavorites} from "./GetFavorites.tsx";

export const Header = () => {
    const [activeCart, setActiveCart] = useState(false);
    const [activeFavorites, setActiveFavorites] = useState(false);

    const handleCartClick =() => {
        setActiveCart(!activeCart);
    }

    const handleLikeClick =() => {
        setActiveFavorites(!activeFavorites);
    }

    return (
        <div className={style.headerWrapper}>
            <p className={style.logo}>IShop</p>
            <svg className={style.heart}
                 onClick={handleLikeClick}
                 fill="none" height="30" stroke="currentColor"
                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
                 width="30" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <GetFavorites isActive={activeFavorites} handleFavoritesClose={handleLikeClick}></GetFavorites>
            <button className={style.btn} onClick={handleCartClick}>Корзина</button>
            <GetCart isActive={activeCart} handleCartClose={handleCartClick}/>
        </div>
    )
}
