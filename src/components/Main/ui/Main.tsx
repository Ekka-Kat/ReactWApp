import {card, filterBtns, ICartItem} from "../../../mocs";
import {GetCards} from "./GetCards";
import {GetButtons} from "./GetFilterButtons";
import {Header} from "../../Header";
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

    const handleAddToCart = (cart: ICartItem[], cardID: number) => {
        const cardItemIndex = card.findIndex((item) => item.id === cardID);
        console.log('cardItemIndex', cardItemIndex);
        console.log('начальное значение cart при вызове handleAddToCart', cart);
        if (!cart || cart.length === 0) {
            setCart([...cart,
                {
                    id: card[cardItemIndex].id,
                    name: card[cardItemIndex].name,
                    price: card[cardItemIndex].price,
                    description: card[cardItemIndex].description,
                    amount: 1
                }
            ]);
        }
        if (cart.length >0) {
            const cartItemIndex= cart.findIndex(item => item.id === cardID);
            if ( cartItemIndex!=-1) {
                setCart(cart.map((item) => item.id === cardID ? {
                    ...item,
                    amount: item.amount + 1,
                    price: item.price + card[cardItemIndex].price
                } : item))
            }
            else
            {
                setCart([...cart,
                    {
                        id: card[cardItemIndex].id,
                        name: card[cardItemIndex].name,
                        price: card[cardItemIndex].price,
                        description: card[cardItemIndex].description,
                        amount: 1
                    }
                ]);
            }
        }
       console.log('значение cart после добавления', cart);
    }
    return (
    <div>
        <Header cart={cart}/>
        <GetButtons onClick = {handleFilterBtnClick} isActive={activeIndex}/>
        <GetCards mapCards={cards} cardsCart={cart} onClickBuy={handleAddToCart}/>
    </div>
   )
}



