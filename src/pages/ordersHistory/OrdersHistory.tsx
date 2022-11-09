import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from '../../components/cart/Loading';
import { ClientAuthenticationContext } from '../../context/ClientAuthenticationContext';
import {GetOrdersData, GET_ORDERS} from '../../graphql/queries/GetOrders';
import {useSnackbar} from '../../hooks/UiHooks/UiHooks';
import {OrderHistory} from '../../interfaces/OrderHistoryInterface';
import {RootStackParamList} from '../../navigation/Navigation';
import OrdersItem from './subsections/OrdersItem';

const OrdersHistory = () => {
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const {t} = useTranslation('translation');
  const handleData = async (data: GetOrdersData) => {
    console.log('data', data);
    const ordersDatabase = data.getClientAccountById.clientAccount.orders;
    const ordersData: OrderHistory[] = [];
    ordersDatabase.forEach(order => {
      let totalProducts = 0;
      order.productsVariantsOrdered.forEach(product => {
        totalProducts += product.quantity;
      });

      const orderData: OrderHistory = {
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.logs[order.logs.length - 1].status,
        time: new Date(order.logs[order.logs.length - 1].time),
        numberOfProducts: totalProducts,
        price: order.deliveryFee + order.subTotal + order.taxs,
      };
      ordersData.push(orderData);
    });
    setOrders(ordersData);
  };

  const [errorSnackbar, {open: openErrorSnackbar}] = useSnackbar({
    severity: 'error',
    messageTranslationKey: t('OrdersHistory.orderHistoryError'),
  });

  const {clientId} = useContext(ClientAuthenticationContext);
   console.log("clientId : ", clientId)


  useQuery<GetOrdersData>(GET_ORDERS, {
    variables: {idClient: clientId},
    onCompleted: handleData,
    onError: openErrorSnackbar,
    fetchPolicy: 'network-only',
  });



  const renderItem = ({item}: {item: OrderHistory}) => {
    return <OrdersItem {...item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <View style={styles.marginTitle} />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{t('OrdersHistory.title')}</Text>
        </View>
        <View style={styles.marginTitle} />
      </View>

      <View style={styles.restMargin}>
        {orders.length === 0 ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={{flex: 1}}></FlatList>
        )}
      </View>
      <View style={styles.marginBottom} />
      {errorSnackbar}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
  },
  titleView: {
    flex: 95,
  },
  marginTitle: {
    flex: 30,
  },
  titleWrapper: {
    flex: 35,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
    includeFontPadding: false,
    color: '#000000',
  },
  marginBottom: {
    flex: 30,
  },
  restMargin: {
    flex: 604,
  },
});

export default OrdersHistory;