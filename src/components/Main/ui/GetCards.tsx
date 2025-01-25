import style from './style.module.scss'
export const GetCards = ({mapCards, currentCart, onClickBuy}) => {
    return (
        <div className={style.gridcontainer}>
            {mapCards.map((item) => (
                <div className={style.cardWrapper} key={item.id}>
                    <p className={style.text}>{item.name}</p>
                    <p className={style.text}>{item.description}</p>
                    <img className={style.cardImg} src={item.cardImage} alt='IPhone'/>
                    <div className={style.priceWrapper}>
                        <span className={style.text}>{item.price}</span>
                        <button
                            className={style.btnBuy}
                            id = {item.id}
                            onClick={(e)=>{onClickBuy(e, currentCart)}}
                        >Купить
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

