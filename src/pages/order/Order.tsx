import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/cart/Loading';
import {
  getOrderByIdData,
  GET_ORDER_BY_ID,
} from '../../graphql/queries/GetOrderById';
import {useSnackbar} from '../../hooks/UiHooks/UiHooks';
import {
  Order as OrderInfo,
  ProductVariant,
} from '../../interfaces/OrderInterface';
import OrderProduct from './subsections/OrderedProduct';

/*
 * Name: Order
 * Description: This file is used to display the order informations with the products, the price and the status.
 * Author: Adam Naoui-Busson, Alessandro van Reusel, Zouhair Derouich
 */

const Order = ({navigation, orderId, goBack, route}: any) => {
  let finalOrderId = orderId;
  if (route?.params?.orderId) {
    finalOrderId = route.params.orderId;
  }
  let finalGoBack = goBack;
  if (route?.params?.goBack) {
    finalGoBack = route.params.goBack;
  }

  const [orderInfo, setOrderInfo] = useState<OrderInfo>();

  const {t} = useTranslation('translation');

  // Handle the data from the query and set the order info
  const handleData = (data: getOrderByIdData) => {
    const order = data.getOrderById.order;
    const storeProductsMap = new Map<string, ProductVariant[]>();
    const storeIdNameMap = new Map<string, string>();
    order.productsVariantsOrdered.forEach(currentProduct => {
      const product: ProductVariant = {
        id: currentProduct.relatedProductVariant._id,
        variantName: currentProduct.relatedProductVariant.variantTitle,
        price: currentProduct.relatedProductVariant.price,
        quantity: currentProduct.quantity,
        imageSrc: currentProduct.relatedProductVariant.imgSrc,
        productName: currentProduct.relatedProductVariant.relatedProduct.title,
      };
      if (
        storeProductsMap.has(
          currentProduct.relatedProductVariant.relatedProduct.relatedStore._id,
        )
      ) {
        const currentProductList = storeProductsMap.get(
          currentProduct.relatedProductVariant.relatedProduct.relatedStore._id,
        );
        if (currentProductList) {
          currentProductList.push(product);
          storeProductsMap.set(
            currentProduct.relatedProductVariant.relatedProduct.relatedStore
              ._id,
            currentProductList,
          );
        }
      } else {
        storeProductsMap.set(
          currentProduct.relatedProductVariant.relatedProduct.relatedStore._id,
          [product],
        );
      }
      if (
        !storeIdNameMap.has(
          currentProduct.relatedProductVariant.relatedProduct.relatedStore._id,
        )
      ) {
        storeIdNameMap.set(
          currentProduct.relatedProductVariant.relatedProduct.relatedStore._id,
          currentProduct.relatedProductVariant.relatedProduct.relatedStore.name,
        );
      }
    });
    const vendorChatMap = new Map<string, string>();
    order.relatedChats.forEach(currentChat => {
      vendorChatMap.set(currentChat.relatedVendor._id, currentChat._id);
    });
    const newOrder: OrderInfo = {
      id: order._id,
      orderNumber: order.orderNumber,
      status: order.logs[order.logs.length - 1].status,
      subTotal: order.subTotal,
      tax: order.taxs,
      deliveryFee: order.deliveryFee,
      total: order.deliveryFee + order.taxs + order.subTotal,
      storeProductsMap: storeProductsMap,
      vendorChatMap: vendorChatMap,
      storeIdNameMap: storeIdNameMap,
    };
    setOrderInfo(newOrder);
  };

  // Using the useSnackbar hook to display the error snackbar
  const [errorSnackbar, {open: openErrorSnackbar}] = useSnackbar({
    severity: 'error',
    messageTranslationKey: t('OrdersHistory.orderError'),
  });

  // Query to get the order by id
  const {error} = useQuery<getOrderByIdData>(GET_ORDER_BY_ID, {
    variables: {idOrder: finalOrderId},
    onCompleted: handleData,
    onError: openErrorSnackbar,
  });

  // Order the products by store
  const getOrderArray = () => {
    const cartArray: {storeId: string; data: ProductVariant[]}[] = [];
    orderInfo?.storeProductsMap.forEach((value, key) => {
      cartArray.push({storeId: key, data: value});
    });
    return cartArray;
  };

  return (
    <SafeAreaView style={styles.container}>
      {!orderInfo ? (
        <Loading />
      ) : (
        <>
          <View style={styles.margin20} />
          <View style={styles.titleWrapper}>
            <TouchableOpacity style={styles.back_button} onPress={finalGoBack}>
              <Image
                style={styles.back_button_icon}
                source={require('../../assets/images/back.png')}
              />
            </TouchableOpacity>
            <Text style={styles.title}>
              {t('OrdersHistory.order')}{' '}
              <Text style={{color: '#FFAA55'}}>#{orderInfo?.orderNumber}</Text>
            </Text>
          </View>
          <View style={styles.margin35} />
          <View style={styles.statusWrapper}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.statusButton,
                  {
                    backgroundColor:
                      orderInfo?.status === 'WAITING_CONFIRMATION'
                        ? '#FFAA55'
                        : '#86FFA8',
                  },
                ]}>
                <Text style={styles.statusText}>
                  {t('OrdersHistory.' + orderInfo.status)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.margin35} />
          <View style={styles.productsView}>
            <SectionList
              sections={getOrderArray()}
              keyExtractor={item => item.id}
              renderItem={({item: orderVariant}) => (
                <OrderProduct variant={orderVariant} />
              )}
              renderSectionHeader={({section: {storeId: storeId}}) => (
                <View style={styles.titleSection}>
                  <Text style={styles.header}>
                    {orderInfo.storeIdNameMap.get(storeId)}
                  </Text>
                  <Icon
                    name="md-chatbubbles-outline"
                    color="black"
                    onPress={() => {
                      navigation.navigate('ChatPage', {
                        goBack: navigation.goBack,
                        chatId: orderInfo.vendorChatMap.get(storeId),
                      });
                    }}
                    size={30}></Icon>
                </View>
              )}
            />
          </View>
          <View style={styles.margin20} />
          <Divider style={styles.divider}></Divider>
          <View style={styles.margin20} />
          <View style={styles.pricesView}>
            <View style={styles.pricesViewMargin} />
            <View style={styles.priceTextView}>
              <Text style={styles.priceText}>{t('Prices.subTotal')}</Text>
              <Text style={styles.priceNumber}>
                ${(Math.round(orderInfo?.subTotal * 100) / 100).toFixed(2)}
              </Text>
            </View>
            <View style={styles.spaceBetweenPrices} />
            <View style={styles.priceTextView}>
              <Text style={styles.priceText}>{t('Prices.taxes')}</Text>
              <Text style={styles.priceNumber}>
                ${(Math.round(orderInfo?.tax * 100) / 100).toFixed(2)}
              </Text>
            </View>
            <View style={styles.spaceBetweenPrices} />
            <View style={styles.priceTextView}>
              <Text style={styles.priceText}>{t('Prices.delivery')}</Text>
              <Text style={styles.priceNumber}>
                ${(Math.round(orderInfo?.deliveryFee * 100) / 100).toFixed(2)}
              </Text>
            </View>
            <View style={styles.spaceBetweenDeliveryAndTotal} />
            <View style={styles.priceTextView}>
              <Text style={styles.totalText}>{t('Prices.total')}</Text>
              <Text style={styles.totalNumber}>
                ${(Math.round(orderInfo?.total * 100) / 100).toFixed(2)}
              </Text>
            </View>
            <View style={styles.pricesViewMargin} />
          </View>
          <View style={styles.margin20} />
        </>
      )}
      {errorSnackbar}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  margin20: {
    flex: 20,
  },
  margin35: {
    flex: 35,
  },
  titleWrapper: {
    flex: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_button: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  back_button_icon: {
    width: 35,
    height: 35,
    tintColor: '#FFA500',
  },
  title: {
    flex: 1,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',

    fontSize: 24,
    color: '#000000',
  },
  statusWrapper: {
    flex: 35,
    alignItems: 'center',
  },
  statusButton: {
    width: '33%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  statusText: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    color: '#000000',
  },
  productsView: {
    flex: 334,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#FFAA55',
  },
  pricesView: {
    flex: 148,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  pricesViewMargin: {
    flex: 10,
  },
  priceTextView: {
    flex: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spaceBetweenPrices: {
    flex: 6,
  },
  spaceBetweenDeliveryAndTotal: {
    flex: 16,
  },
  priceText: {
    alignContent: 'flex-start',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 15,
    color: 'black',
  },
  priceNumber: {
    alignContent: 'flex-end',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 15,
    color: 'black',
  },
  totalText: {
    alignContent: 'flex-start',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    color: 'black',
  },
  totalNumber: {
    alignContent: 'flex-end',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 15,
    color: '#FFAA55',
  },
  header: {
    fontSize: 24,
    marginTop: 10,
    color: '#000000',
    includeFontPadding: false,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Order;
