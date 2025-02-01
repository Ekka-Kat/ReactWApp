import style from "./style.module.scss";
import {filterBtns, IGetFilterButtonsProps} from "../../../mocs";

export const GetButtons = ( {isActiveIndex, onClick}: IGetFilterButtonsProps) => {
    return (
        <div className={style.selectWrapper}>
            <p className={style.text}>Модели</p>
            { filterBtns.map((item, index) => (
                <button
                    key={index}
                    className={`style.btn ${ isActiveIndex === index ? style.btnActive: style.btnInactive}`}
                    onClick={(e)=>{onClick(e, index)}}
                >{item}
                </button>
            ))
            }
        </div>
    )
}