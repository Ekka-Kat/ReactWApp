export interface ICard {
    id: number;
    name: string;
    price: number;
    color: string;
    description: string;
    cardImage: string;
}

/*export const card: ICard[] = [
    {
        id: 1,
        name: 'IPhone 16 Pro Max',
        price: 120,
        color: 'титановый черный',
        description: '512 Gb',
        cardImage:  'https://static.re-store.ru/upload/resize_cache/iblock/7ef/100500_800_140cd750bba9870f18aada2478b24840a/jm7m7ij6vyfcqdyyqu2pnc8zmyg5x5hs.jpg'
       },
    {
        id: 2,
        name: 'IPhone 16 Plus',
        price: 110,
        color: 'титановый бирюзовый',
        description: '256 Gb',
        cardImage:  'https://static.re-store.ru/upload/resize_cache/iblock/7fb/100500_800_140cd750bba9870f18aada2478b24840a/lts3cglj5krqjq5n6urnai9w7myebrdq.jpg'
    },
    {
        id: 3,
        name: 'IPhone 16',
        price: 100,
        color: 'ультрамарин',
        description: '128 Gb',
        cardImage:  'https://static.re-store.ru/upload/resize_cache/iblock/393/100500_800_140cd750bba9870f18aada2478b24840a/93t6egbijl6ctbf5st2l8x5mmlk2tj7j.jpg'
    },
    {
        id: 4,
        name: 'IPhone 15 Pro Max',
        price: 95,
        color: 'титановый синий',
        description: '256 Gb',
        cardImage:  'https://static.re-store.ru/upload/resize_cache/iblock/f6c/100500_800_140cd750bba9870f18aada2478b24840a/ra2fyvzq38gczjo6cbyrt247u02ku6uw.jpg'
},
    {
        id: 5,
        name: 'IPhone 15',
        price: 90,
        color: 'голубой',
        description: '256 Gb',
        cardImage:  'https://static.re-store.ru/upload/resize_cache/iblock/d26/100500_800_140cd750bba9870f18aada2478b24840a/rhct1irj4oinhdy7vqe4ri45tbxdjtls.jpg'
    },
    {
        id: 6,
        name: 'IPhone 15',
        price: 85,
        color: 'розовый',
        description: '128 Gb',
        cardImage:  'https://static.re-store.ru/upload/resize_cache/iblock/1b4/100500_800_140cd750bba9870f18aada2478b24840a/t0eygsf1xeatqrxiaof9sglrhbwxgcel.jpg'
    },
    {
        id: 7,
        name: 'IPhone 14 dual-SIM',
        price: 90,
        color: 'темная ночь',
        description: '256 Gb ',
        cardImage:  'https://static.re-store.ru/upload/resize_cache/iblock/2e3/100500_800_140cd750bba9870f18aada2478b24840a/in3is984kowf7frgsq3j5bsquveym21p.jpeg'
    },
    {
        id: 8,
        name: 'IPhone 14',
        price: 80,
        color: 'сияющая звезда',
        description: '',
        cardImage:  'https://static.re-store.ru/upload/resize_cache/iblock/4c4/100500_800_140cd750bba9870f18aada2478b24840a/q1njeoh12b1pf5lk05ul40ty8ajxd77y.jpeg'
    },
    {
        id: 9,
        name: 'IPhone 14',
        price: 70,
        color: 'фиолетовый',
        description: '128 Gb',
        cardImage:  'https://static.re-store.ru/upload/resize_cache/iblock/f53/100500_800_140cd750bba9870f18aada2478b24840a/w8xas3qzcppg9cnupp88oa0o0pjysqe2.jpeg'
    },
]*/

export const filterBtns = ['Все', 'IPhone 16', 'IPhone 15', 'IPhone 14'];


export interface ICartItem {
        id: number;
        name: string;
        price: number;
        pricePerItem: number;
        description: string;
        amount: number;
}

/*export interface ICartProps {
    cart: ICartItem[];
}*/

export interface IGetCartProps {
    isActive: boolean;
    handleCartClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IGetCardProps {
    mapCards: ICard[];
    onClickBuy: (id: number) => void;
}

export interface IGetFilterButtonsProps {
    isActiveIndex: number;
    onClick: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}