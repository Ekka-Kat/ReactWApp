import style from './style.module.scss'
import { IGetCardProps } from '../../../mocs';
import clsx from "clsx";
//import { ReactComponent as HeartIcon } from '../../../assets/like.svg';

export const GetCards = ({mapCards, ActiveId, onClickBuy, onClickLike}: IGetCardProps) => {
    //  <HeartIcon fill="red" width={48} height={48} />;
    return (
        <div className={style.gridcontainer}>
            {mapCards.map((item) => (
                <div className={style.cardWrapper} key={item.id}>
                    <div className={style.titleWrapper}>
                        <p className={style.text}>{item.name}</p>
                        <svg className={clsx(style.heart, {
                            [style.heartActive]: ActiveId.includes(item.id), // Проверяем, есть ли item.id в массиве
                        })}
                             onClick={() => {
                                 onClickLike(item.id)
                             }}
                             fill="none" height="30" stroke="currentColor"
                             strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
                             width="30" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <p className={style.text}>{item.description}</p>
                        <img className={style.cardImg} src={item.cardImage} alt='IPhone'/>
                    </div>
                    <div className={style.priceWrapper}>
                        <span className={style.price}>{item.price} ₽</span>
                        <button
                            className={style.btnBuy}
                            onClick={() => {
                                onClickBuy(item.id)
                            }}
                        >В корзину
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

