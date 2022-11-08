export type ProductVariant = {
    id: string;
    productName: string;
    variantName: string;
    price: number;
    quantity: number;
    imageSrc: string;
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
  };