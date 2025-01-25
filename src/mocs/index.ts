interface ICard {
    id: number;
    name: string;
    price: number;
    color: string;
    description: string;
    cardImage: string;
}

export const card: ICard[] = [
    {
        id: 1,
        name: 'IPhone 16 Pro Max',
        price: 120,
        color: 'black',
        description: '512 Gb',
        cardImage:  'https://rebro-store.ru/upload/iblock/6e4/qlu0grprc3kzftvkci4fnn2j6gjua96z.jpg'
       },
    {
        id: 2,
        name: 'IPhone 16 Plus',
        price: 110,
        color: 'gold',
        description: '256 Gb',
        cardImage:  'https://rebro-store.ru/upload/iblock/6e4/qlu0grprc3kzftvkci4fnn2j6gjua96z.jpg'
    },
    {
        id: 3,
        name: 'IPhone 16',
        price: 100,
        color: 'blue',
        description: '128 Gb',
        cardImage:  'https://rebro-store.ru/upload/iblock/6e4/qlu0grprc3kzftvkci4fnn2j6gjua96z.jpg'
    },
    {
        id: 4,
        name: 'IPhone 15 Pro Max',
        price: 900,
        color: 'black',
        description: '256 Gb',
        cardImage:  'https://rebro-store.ru/upload/iblock/6e4/qlu0grprc3kzftvkci4fnn2j6gjua96z.jpg'
},
    {
        id: 5,
        name: 'IPhone 15 Plus',
        price: 80,
        color: 'black',
        description: '256 Gb',
        cardImage:  'https://rebro-store.ru/upload/iblock/6e4/qlu0grprc3kzftvkci4fnn2j6gjua96z.jpg'
    },
    {
        id: 6,
        name: 'IPhone 15',
        price: 70,
        color: 'black',
        description: '128 Gb',
        cardImage:  'https://rebro-store.ru/upload/iblock/6e4/qlu0grprc3kzftvkci4fnn2j6gjua96z.jpg'
    },
]

export const filterBtns = ['Все', 'IPhone 16', 'IPhone 15'];


export interface ICartItem {
        id: number;
        name: string;
        price: number;
        description: string;
        amount: number;
}
/*
export const cartItem: ICartItem = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    amount: 0,
};*/