export interface ICard {
    id: number;
    name: string;
    price: number;
    color: string;
    description: string;
    cardImage: string;
}

//export const filterBtns = ['Все', 'IPhone 16', 'IPhone 15', 'IPhone 14'];

type FilterType = 'Все' | 'IPhone 16' | 'IPhone 15' | 'IPhone 14';

export const filterBtns: FilterType[] = ['Все', 'IPhone 16', 'IPhone 15', 'IPhone 14'];

export interface ICartItem {
        id: number;
        name: string;
        price: number;
        pricePerItem: number;
        description: string;
        amount: number;
}

export interface IGetCartProps {
    isActive: boolean;
    handleCartClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IGetFavoriteProps {
    isActive: boolean;
    handleFavoritesClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IGetCardProps {
    mapCards: ICard[];
    ActiveId: number[];
    onClickBuy: (id: number) => void;
    onClickLike: (id: number) => void;
}

/*export interface IGetFilterButtonsProps {
    isActiveIndex: number;
    onClick: (btnText: string, index: number) => void;
}*/

export interface IGetFilterButtonsProps {
    isActiveIndex: number;
    onClick: (filter: FilterType, index: number) => void;
}

