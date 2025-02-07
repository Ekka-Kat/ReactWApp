import style from "./style.module.scss";
import {filterBtns, IGetFilterButtonsProps} from "../../../types";
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
                    onClick={() => {onClick(item, index);}}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};
