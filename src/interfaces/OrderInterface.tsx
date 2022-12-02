export type ProductVariant = {
    id: string;
    productName: string;
    variantName: string;
    price: number;
    quantity: number;
    imageSrc: string;
  };

  export type Store = {
    id: string;
    name: string;
    isOpen: boolean;
    isPaused: boolean;
  };
  
  export type Order = {
    id: string;
    orderNumber: string;
    status: string;
    subTotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    storeProductsMap: Map<string, ProductVariant[]>;
    vendorChatMap: Map<string, string>;
    storeIdNameMap: Map<string, string>;
  };

