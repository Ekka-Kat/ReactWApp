import { filterBtns, ICard } from '../../../types';
import { GetCards } from './GetCards';
import { GetButtons } from './GetFilterButtons';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store.ts';
import { fetchCardData } from '../../../store/thunk.ts'
import { addToCart } from '../../../store/thunkCart.ts';
import { addToFavorites, removeFromFavorites } from '../../../store/likeReducer.ts';
import { getCard } from '../../../store/selector.ts';

export const Cards = () => {
    const allCards = filterBtns[0];
    const [cards, setCards] = useState<ICard[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeLikeId, setActiveLikeId] = useState<number[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const { data }   = useSelector( getCard);

   /* два в одном не работают - не происходит обновление cards при фильтрации
   useEffect(() => {
        dispatch(fetchCardData())
        if (data) {setCards(data)}
    }, [dispatch, data]);*/

    useEffect(() => {
        dispatch(fetchCardData());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setCards(data);
        }
    }, [data]);

    const handleFilterBtnClick = (btnText: string, index: number) => {
        if (btnText === allCards) {
            setCards(data);
            setActiveIndex(index);
        }
        else {
            const filteredCards = data.filter((item: ICard) => item.name.includes(btnText));
            setCards(filteredCards);
            setActiveIndex(index);
        }
    }

    const handleAddToCart = (id: number) => {
        const cardItem = cards.find((item) => item.id === id);
        if (cardItem) {
            const cardToCart = { ...cardItem, pricePerItem:cardItem.price, amount:1};
            dispatch(addToCart(cardToCart));
        }
    };

   const handleFavorites =(id: number) => {
        const isFavorite = activeLikeId.includes(id);
        if (!isFavorite) {
            const cardItem = cards.find((item) => item.id === id);
            if (cardItem) {
                const cardToFavorites = {...cardItem, pricePerItem:cardItem.price, amount: 1}
                dispatch(addToFavorites(cardToFavorites));
            }
            setActiveLikeId([...activeLikeId,id]);
            return
        }
        if (isFavorite) {
            dispatch(removeFromFavorites(id)); // если отменили лайк, удаляем товар из избранного
            setActiveLikeId(activeLikeId.filter((likeId) => likeId !== id));
        }
    };

    return (
    <div>
        <GetButtons onClick={handleFilterBtnClick} isActiveIndex={activeIndex}/>
        <GetCards mapCards={cards} ActiveId={activeLikeId} onClickLike={handleFavorites} onClickBuy={handleAddToCart}/>
    </div>
   )
}



