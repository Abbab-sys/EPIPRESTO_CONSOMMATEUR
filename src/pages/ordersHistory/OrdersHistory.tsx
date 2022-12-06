import {useQuery} from '@apollo/client';
import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from '../../components/cart/Loading';
import {ClientAuthenticationContext} from '../../context/ClientAuthenticationContext';
import {GET_ORDERS, GetOrdersData} from '../../graphql/queries/GetOrders';
import {OrderHistory} from '../../interfaces/OrderHistoryInterface';
import OrdersItem from './subsections/OrdersItem';
import Order from '../order/Order';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';

/*
 * Name: Orders History
 * Description: This file is used to display the orders history.
 * Author: Adam Naoui-Busson, Alessandro van Reusel, Khalil Zriba, Zouhair Derouich
 */

const OrdersHistory = () => {
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const {t} = useTranslation('translation');

  // Handle order's data from the query and set the orders
  const handleData = async (data: GetOrdersData) => {
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
    ordersData.sort((a, b) => {
      return b.time.getTime() - a.time.getTime();
    });
    setOrders(ordersData);
  };

  const {clientId} = useContext(ClientAuthenticationContext);

  // Query to get the orders
  const {error, loading, refetch} = useQuery<GetOrdersData>(GET_ORDERS, {
    variables: {idClient: clientId},
    onCompleted: handleData,
    fetchPolicy: 'network-only',
  });

  const [currOrderId, setCurrOrderId] = useState('');
  const navigation = useNavigation();

  // Render the orders for the flatlist
  const renderItem = ({item}: {item: OrderHistory}) => {
    return (
      <OrdersItem order={item} goToOrder={() => setCurrOrderId(item.id)} />
    );
  };

  if (currOrderId) {
    return (
      <Order
        navigation={navigation}
        orderId={currOrderId}
        goBack={() => setCurrOrderId('')}></Order>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{t('OrdersHistory.title')}</Text>
        </View>
      </View>

      <View style={styles.restMargin}>
        {loading ? (
          <Loading />
        ) : error ? (
          <View style={styles.innerContainer}>
            <Text style={styles.errorText}>
              {t('OrdersHistory.orderHistoryError')}
            </Text>
            <IconButton
              icon="reload"
              iconColor="orange"
              size={30}
              onPress={() => {
                refetch({idClient: clientId, distance: 15});
              }}
            />
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.innerContainer}>
            <Text style={styles.errorText}>
              {t('dashboard.latestOrders.errors.notAvailable')}
            </Text>
            <IconButton
              icon="reload"
              iconColor="orange"
              size={30}
              onPress={() => {
                refetch({idClient: clientId, distance: 15});
              }}
            />
          </View>
        ) : (
          <FlatList
            data={orders}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  refetch({idClient: clientId, distance: 15});
                }}
              />
            }
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={{flex: 1}}></FlatList>
        )}
      </View>
      <View style={styles.marginBottom} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  titleView: {
    flex: 118,
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
    textAlignVertical: 'center',
  },
  marginBottom: {
    flex: 30,
  },
  restMargin: {
    flex: 641,
  },
  errorText: {
    textAlign: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default OrdersHistory;
