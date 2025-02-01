import {filterBtns, ICard} from "../../../mocs";
import {GetCards} from "./GetCards";
import {GetButtons} from "./GetFilterButtons";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { RootState } from '../../../store/store.ts';
import { fetchCardData } from '../../../store/thunk.ts'
import {addToCart} from "../../../store/cartReducer.ts";
import {getCard} from "../../../store/selector.ts";

export const Cards = () => {
    const allCards = filterBtns[0];
    const [cards, setCards] = useState<ICard[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const dispatch = useDispatch();
    const { data }   = useSelector( getCard);

    useEffect(() => {
        dispatch(fetchCardData() as any)
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setCards(data);
        }
    }, [data]);


    const handleFilterBtnClick = (btn, index) => {
        if (btn.target.innerHTML === allCards) {
            setCards(data);
            setActiveIndex(index);;
        }
        else {
            const filteredCards = cards.filter(item => item.name.includes(btn.target.innerHTML));
            setCards(filteredCards);
            setActiveIndex(index);
        }
    }

   const handleAddToCart = (id: number) => {
        const cardToCart = cards.find((item) => item.id === id);
        if (cardToCart) {
            dispatch(addToCart({
                id: cardToCart.id,
                name: cardToCart.name,
                price: cardToCart.price,
                pricePerItem: cardToCart.price,
                description: cardToCart.description,
                amount: 1,
            }));
        }
    };

    return (
    <div>
        <GetButtons onClick = {handleFilterBtnClick} isActiveIndex={activeIndex}/>
        <GetCards mapCards={data} onClickBuy={handleAddToCart}/>
    </div>
   )
}



