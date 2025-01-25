import style from "./style.module.scss";
import {filterBtns} from "../../../mocs";

export const GetButtons = ({onClick, isActive}) => {
    return (
        <div className={style.selectWrapper}>
            <p className={style.text}>Модели</p>
            { filterBtns.map((item, index) => (
                <button
                    key={index}
                    className={`style.btn ${ isActive === index ? style.btnActive: style.btnInactive}`}
                    onClick={(e)=>{onClick(e, index)}}
                >{item}
                </button>
            ))
            }
        </div>
    )
}