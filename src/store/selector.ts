import {RootState} from "./store.ts";

export const getCard = (state: any) => state.card;
export const getCart = (state: any) => state.cart;
export const getLikeItems  = (state: RootState) => state.like.items;