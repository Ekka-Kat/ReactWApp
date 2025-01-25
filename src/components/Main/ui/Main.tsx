import {card, filterBtns, ICartItem} from "../../../mocs";
import {GetCards} from "./GetCards";
import {GetButtons} from "./GetFilterButtons";
import style from "./style.module.scss";
import { useState } from 'react'

export const Main = () => {
    const allCards = filterBtns[0];
    const [cards, setCards] = useState(card);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [cart, setCart] = useState<ICartItem[]>([]);


    const handleFilterBtnClick = (btn, index) => {
        if (btn.target.innerHTML === allCards) {
            setCards(card);
            setActiveIndex(index);
            console.log('index', index);
        }
        else {
            const filteredCards = card.filter(item => item.name.includes(btn.target.innerHTML));
            setCards(filteredCards);
            setActiveIndex(index);
            console.log('index', index);
        }
    }

    const handleAddToCart = (btn, cart: ICartItem[]) => {
        const cardItemIndex = card.findIndex((item) => item.id === parseInt(btn.target.id));
        console.log('cardItemIndex', cardItemIndex);
        console.log('начальное значение cart при вызове handleAddToCart', cart);
        if (!cart || cart.length === 0) {
            setCart([...cart,
                {
                    id: card[cardItemIndex].id, name: card[cardItemIndex].name,
                    price: card[cardItemIndex].price, description: card[cardItemIndex].description, amount: 1
                }
            ]);
        }
        else {
            const cartItemIndex= cart.findIndex(item => item.id === parseInt(btn.target.id))
            if ( cartItemIndex!= -1) {
                cart[cartItemIndex].amount += 1;
                cart[cartItemIndex].price += card[cardItemIndex].price;
                setCart(cart);
            }
            else
            {
                setCart([...cart,
                    {
                        id: card[cardItemIndex].id, name: card[cardItemIndex].name,
                        price: card[cardItemIndex].price, description: card[cardItemIndex].description, amount: 1
                    }
                ]);
            }
        }
       console.log('значение cart после добавления', cart);
    }

    return (
    <div>
    <GetButtons onClick = {handleFilterBtnClick} isActive={activeIndex}/>
    <GetCards mapCards={cards} currentCart={cart} onClickBuy={handleAddToCart}/>
    <Header cartToRender={cart}/>
    </div>
   )
}
//
const Header = (cartToRender: ICartItem[]) => {

    const [activeCart, setActiveCart] = useState(false);

    const handleCartClick =() => {
        setActiveCart(!activeCart);
    }

    interface GetCartProps {
        cart: ICartItem[] | null;
        isActive: boolean;
    }

    const GetCart = ({ cartToRender, isActive }) => {
        if (!cartToRender) {
            return
        }
        if (cartToRender.length === 0) {
            return (
                <div className={style.cartActive}>
                    <p> В вашей корзине 0 товаров </p>
                </div>
            );
        } /*else {
            return (
                <div className={`${isActive ? style.cartActive : style.hidden}`}>
                    {cartToRender.map((item) => (
                        <div className={style.cartItem} key={item.id}>
                            <p className={style.text}>{item.name}</p>
                            <p className={style.text}>{item.description}</p>
                            <p className={style.text}>{item.price}</p>
                            <p className={style.text}>{item.amount}</p>
                        </div>
                    ))}
                </div>
            );
        }*/
    }

    return (
        <div className={style.headerWrapper}>
            <p className={style.logo}>IShop</p>
            <button className={style.btn} onClick={handleCartClick}>Корзина</button>
            <GetCart cartToRender={cartToRender} isActive={activeCart}/>
        </div>
    )
}



