import React from "react";

export type StoreOrder = {
  storeId: string,
  storeName: string,
}
export type OrderVariant = {
  variantId: string,
  variantName: string,
  quantity: number,
  price: number,
  imageSrc: string,
  taxable: boolean,
}

type Cart = {
  variantIdStore: Map<string, StoreOrder>;
  setVariantIdStore: (variantIdStore: Map<string, StoreOrder>) => void;

  cart: Map<StoreOrder, Map<string, OrderVariant>>;
  setCart: (cart: Map<StoreOrder, Map<string, OrderVariant>>) => void;
}

const defaultContext: Cart = {
  variantIdStore: new Map<string, StoreOrder>(),
  setVariantIdStore: (variantIdStore) => {
    console.log('Stub for setVariantIdStore with : ', variantIdStore);
  },
  cart: new Map<StoreOrder, Map<string, OrderVariant>>(),
  setCart: (cart) => {
    console.log('Stub for setCart with : ', cart);
  },
};
export const CartContext = React.createContext<Cart>(defaultContext);

export const CartProvider = ({children}: { children: React.ReactNode }) => {
  const [variantIdStore, setVariantIdStore] = React.useState<Map<string, StoreOrder>>(new Map<string, StoreOrder>());
  const [cart, setCart] = React.useState<Map<StoreOrder, Map<string, OrderVariant>>>(new Map<StoreOrder, Map<string, OrderVariant>>());

  return (
    <CartContext.Provider value={{variantIdStore, setVariantIdStore, cart, setCart}}>
      {children}
    </CartContext.Provider>
  );
}
