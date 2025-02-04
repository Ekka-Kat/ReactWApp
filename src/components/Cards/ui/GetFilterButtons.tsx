import style from "./style.module.scss";
import {filterBtns, IGetFilterButtonsProps} from "../../../mocs";
import clsx from "clsx";

export const GetButtons = ( {isActiveIndex, onClick}: IGetFilterButtonsProps) => {
    return (
        <div className={style.selectWrapper}>
            <p className={style.text}>Модели</p>
            { filterBtns.map((item, index) => (
                <button
                    key={index}
                    className={clsx(style.btn, {
                        [style.btnActive]: isActiveIndex === index,
                        [style.btnInactive]: isActiveIndex !== index,
                    })}
                    onClick={(event) => {
                        const target = event.currentTarget as HTMLElement;
                        onClick(target.innerHTML, index);
                    }}
                >{item}
                </button>
            ))
            }
        </div>
    )
}