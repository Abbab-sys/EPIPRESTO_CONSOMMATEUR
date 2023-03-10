import React, {useContext, useEffect, useRef} from 'react';
import {CartContext, OrderVariant, StoreOrder} from '../../context/CartContext';
import {
  Image,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  GET_VARIANT_QUANTITY,
  GetVariantQuantityData,
} from '../../graphql/queries/GetVariantQuantity';
import {useLazyQuery, useMutation} from '@apollo/client';
import {useSnackbar} from '../UiHooks/UiHooks';
import {useTranslation} from 'react-i18next';
import {SUBMIT_ORDER} from '../../graphql/mutations/SubmitOrder';
import {ClientAuthenticationContext} from '../../context/ClientAuthenticationContext';
import {ChatContext} from '../../context/ChatContext';

/*
 * Name: Use Cart Manager
 * Description: Hook for cart manager
 * Author: Adam Naoui-Busson, Alessandro van Reusel
 */

export type AddVariantToCart = {
  variantId: string;
  variantName: string;
  storeId: string;
  storeName: string;
  price: number;
  imageSrc: string;
  taxable: boolean;
};
export const useCartManager = () => {
  const {cart, setCart, variantIdStore, setVariantIdStore} =
    useContext(CartContext);

  const [_, {refreshChats}] = useContext(ChatContext);

  const {t} = useTranslation('translation');
  const [submitOrder, {data: submitOrderData}] = useMutation(SUBMIT_ORDER);
  const clientId = useContext(ClientAuthenticationContext).clientId;

  // snackbar for quantity error
  const [quantityErrorSnackbar, {open: openQuantityErrorSnackbar}] =
    useSnackbar({
      severity: 'error',
      messageTranslationKey: 'Cannot add more quantity than available',
    });

  // Query to get variant quantity
  const [verifyQuantity, {data}] = useLazyQuery(GET_VARIANT_QUANTITY, {
    fetchPolicy: 'network-only',
  });
  let unwrappedDataQuantity: GetVariantQuantityData | undefined =
    data as GetVariantQuantityData;

  // Use effect to verify quantity of variant in cart is not greater than available quantity in
  // stock when variant is added to cart or when cart is loaded
  useEffect(() => {
    if (!unwrappedDataQuantity) return;
    const variantId =
      unwrappedDataQuantity.getProductVariantById.productVariant._id;
    const quantity =
      unwrappedDataQuantity.getProductVariantById.productVariant.stock;
    let store = variantIdStore.get(variantId);
    if (store) {
      const storeVariants = cart.get(store);
      if (storeVariants) {
        const variantInCart = storeVariants.get(variantId);
        if (variantInCart && variantInCart.quantity > quantity) {
          // set quantity to max available
          openQuantityErrorSnackbar();
          variantInCart.quantity = quantity;
          storeVariants.set(variantId, variantInCart);
          cart.set(store, storeVariants);
          setCart(new Map(cart));
        }
      }
    }
  }, [unwrappedDataQuantity]);

  // Use effect to clear cart and refresh chats when order is submitted
  useEffect(() => {
    if (submitOrderData) {
      clearCart();
      refreshChats();
    }
  }, [submitOrderData]);

  // Submit order and return order id if successful or undefined if not successful
  const submitCartOrder = async () => {
    const productsVariantsToOrder: any[] = [];
    for (let [store, variantMap] of cart) {
      for (let [variantId, variant] of variantMap) {
        productsVariantsToOrder.push({
          discount: 0,
          quantity: variant.quantity,
          relatedProductVariantId: variant.variantId,
        });
      }
    }
    const orderId = await submitOrder({
      variables: {
        clientId: clientId,
        paymentMethod: 'VISA',
        productsVariantsToOrder,
      },
    });
    return orderId.data.submitOrder.order._id;
  };

  // Add variant to cart and update cart state
  const addVariantToCart = (variant: AddVariantToCart, quantity: number) => {
    let store = variantIdStore.get(variant.variantId);
    if (!store) {
      for (let storeOrder of cart.keys()) {
        if (storeOrder.storeId === variant.storeId) {
          store = storeOrder;
          break;
        }
      }
    }
    if (store) {
      const storeVariants = cart.get(store);
      if (storeVariants) {
        const variantInCart = storeVariants.get(variant.variantId);
        if (variantInCart) {
          variantInCart.quantity += quantity;
          verifyQuantity({variables: {idVariant: variant.variantId}});
          storeVariants.set(variant.variantId, variantInCart);
          setCart(new Map(cart.set(store, storeVariants)));
        } else {
          storeVariants.set(variant.variantId, {
            ...variant,
            quantity: quantity,
          });
          setVariantIdStore(
            new Map(variantIdStore.set(variant.variantId, store)),
          );
          setCart(new Map(cart.set(store, storeVariants)));
        }
      } else {
        const newStoreCart = new Map<string, OrderVariant>();
        newStoreCart.set(variant.variantId, {...variant, quantity: quantity});
        setCart(new Map(cart.set(store, newStoreCart)));
      }
    } else {
      const newStoreCart = new Map<string, OrderVariant>();
      newStoreCart.set(variant.variantId, {...variant, quantity: quantity});
      const newStore = {
        storeId: variant.storeId,
        storeName: variant.storeName,
      };
      setVariantIdStore(
        new Map(variantIdStore.set(variant.variantId, newStore)),
      );
      setCart(new Map(cart.set(newStore, newStoreCart)));
    }
  };

  // Delete variant from cart and update cart state if quantity is 0
  const deleteVariantFromCart = (variantId: string) => {
    const store = variantIdStore.get(variantId);
    if (store) {
      const storeVariants = cart.get(store);
      if (storeVariants) {
        storeVariants.delete(variantId);
        if (storeVariants.size === 0) {
          cart.delete(store);
        }
        setCart(new Map(cart));
      }
    }
  };

  // Change variant quantity in cart and update cart state
  const changeVariantQuantity = (variantId: string, quantity: number) => {
    const store = variantIdStore.get(variantId);
    if (store) {
      const storeVariants = cart.get(store);
      if (storeVariants) {
        const variantInCart = storeVariants.get(variantId);
        if (variantInCart) {
          variantInCart.quantity = quantity;
          storeVariants.set(variantId, variantInCart);
          setCart(new Map(cart.set(store, storeVariants)));
        }
      }
    }
  };

  // Increment variant quantity in cart and update cart state
  const incrementVariantQuantity = (variantId: string) => {
    const store = variantIdStore.get(variantId);
    if (store) {
      const storeVariants = cart.get(store);
      if (storeVariants) {
        const variantInCart = storeVariants.get(variantId);
        if (variantInCart) {
          variantInCart.quantity += 1;
          storeVariants.set(variantId, variantInCart);
          setCart(new Map(cart.set(store, storeVariants)));
          verifyQuantity({variables: {idVariant: variantId}});
        }
      }
    }
  };

  // Decrement variant quantity in cart and update cart state
  const decrementVariantQuantity = (variantId: string) => {
    const store = variantIdStore.get(variantId);
    if (store) {
      const storeVariants = cart.get(store);
      if (storeVariants) {
        const variantInCart = storeVariants.get(variantId);
        if (variantInCart && variantInCart.quantity > 1) {
          variantInCart.quantity -= 1;
          storeVariants.set(variantId, variantInCart);
          setCart(new Map(cart.set(store, storeVariants)));
        }
      }
    }
  };

  // Clear cart and update cart state
  const clearCart = () => {
    setCart(new Map());
    setVariantIdStore(new Map());
  };

  // Get cart total price without delivery cost and taxes
  const getCartSubTotal = () => {
    let total = 0;
    cart.forEach(variants => {
      variants.forEach(variant => {
        total += variant.price * variant.quantity;
      });
    });
    return total;
  };
  const cartSubTotal = getCartSubTotal();

  // Get delivery cost
  const getCartDeliveryCost = () => {
    let deliveryCost = 0;
    if (cart.size > 0) {
      deliveryCost = 9.99 + (cart.size - 1) * 2.99;
    }
    return deliveryCost;
  };
  const cartDeliveryCost = getCartDeliveryCost();

  // Get taxes on cart total price
  const getTaxedCartSubTotal = () => {
    let total = 0;
    cart.forEach(variants => {
      variants.forEach(variant => {
        if (variant.taxable) total += variant.price * variant.quantity;
      });
    });
    return (total + cartDeliveryCost) * 0.14975;
  };
  const cartTaxedSubTotal = getTaxedCartSubTotal();

  // Get variant and order by store
  const getCart = () => {
    const cartArray: {store: StoreOrder; data: OrderVariant[]}[] = [];
    cart.forEach((variants, store) => {
      cartArray.push({store, data: Array.from(variants.values())});
    });
    return cartArray;
  };
  const CartItem = ({variant}: {variant: OrderVariant}) => {
    return (
      <View style={styles.cartItem}>
        <View style={styles.margin}></View>
        <View style={styles.imageWrapper}>
          <View style={styles.imageMargin} />
          <Image source={{uri: variant.imageSrc}} style={styles.image} />
          <View style={styles.imageMargin} />
        </View>
        <View style={styles.margin} />
        <View style={styles.margin} />
        <View style={styles.cartItemInfo}>
          <View style={styles.cartItemInfoTopMargin} />
          <View style={styles.cartItemNameView}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.cartItemName}>
              {variant.variantName}
            </Text>
          </View>
          <View style={styles.cartItemPriceView}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.cartItemPrice}>
              {((variant.price * 100) / 100).toFixed(2)} $
            </Text>
          </View>
          <View style={styles.cartItemInfoBottomMargin} />
        </View>
        <View style={styles.quantityWrapper}>
          <View style={styles.margin} />
          <View style={styles.deleteVariantWrapper}>
            <TouchableOpacity
              onPress={() => {
                deleteVariantFromCart(variant.variantId);
              }}>
              <Icon name="times" color="#FFAA55" size={20}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.margin} />
          <View style={styles.cartItemQuantity}>
            <TouchableOpacity
              onPress={() => {
                decrementVariantQuantity(variant.variantId);
              }}>
              <Icon name="minus" color="black" size={25}></Icon>
            </TouchableOpacity>

            <Text style={styles.quantityLetter}>{variant.quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                incrementVariantQuantity(variant.variantId);
              }}>
              <Icon color="black" name="plus" size={25}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.margin} />
          <View style={styles.margin} />
          <View style={styles.margin} />
          <View style={styles.margin} />
        </View>
        <View style={styles.margin} />
      </View>
    );
  };

  type CartListProps = {
    cartData: {store: StoreOrder; data: OrderVariant[]}[];
  };
  const CartList = (props: CartListProps) => {
    const sectionListRef = useRef(null);
    // sectionListRef.current?.scrollToLocation({sectionIndex:currSectionIndex?.current,itemIndex:currItemIndex?.current})

    return (
      <SectionList
        ref={sectionListRef}
        sections={props.cartData}
        keyExtractor={item => item.variantId}
        renderItem={({item: orderVariant}) => (
          <CartItem variant={orderVariant} />
        )}
        renderSectionHeader={({section: {store}}) => (
          <Text style={styles.header}>{store.storeName}</Text>
        )}
      />
    );
  };

  const cartView =
    cart.size > 0 ? (
      <CartList cartData={getCart()}></CartList>
    ) : (
      <View style={styles.emptyCart}>
        <Text style={styles.emptyCartText}>{t('ShoppingCart.emptyCart')}</Text>
      </View>
    );

  return {
    cart,
    cartView,
    addVariantToCart,
    cartSubTotal,
    deleteVariantFromCart,
    changeVariantQuantity,
    incrementVariantQuantity,
    decrementVariantQuantity,
    cartDeliveryCost,
    cartTaxedSubTotal,
    quantityErrorSnackbar,
    clearCart,
    submitCartOrder,
  };
};

const styles = StyleSheet.create({
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: '#000000',
  },
  cartItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    flex: 1,
  },
  margin: {
    flex: 10,
  },
  imageWrapper: {
    flex: 71,
    flexDirection: 'column',
  },
  imageMargin: {
    flex: 17,
  },
  image: {
    flex: 1,
    height: 100,
    resizeMode: 'contain',
  },
  cartItemInfo: {
    flex: 128,
    flexDirection: 'column',
  },
  cartItemInfoTopMargin: {
    flex: 19,
  },
  cartItemNameView: {
    flex: 31,
  },
  cartItemName: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: '#000000',
    includeFontPadding: false,
  },
  cartItemPriceView: {
    flex: 22,
  },
  cartItemPrice: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: '#000000',
    includeFontPadding: false,
  },
  cartItemInfoBottomMargin: {
    flex: 45,
  },
  quantityWrapper: {
    flex: 91,
    flexDirection: 'column',
  },
  deleteVariantWrapper: {
    flex: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteVariantButton: {},
  cartItemQuantity: {
    flex: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityLetter: {
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#000000',
    includeFontPadding: false,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 24,
    marginTop: 10,
    color: '#000000',
  },
  title: {
    fontSize: 24,
  },
});
