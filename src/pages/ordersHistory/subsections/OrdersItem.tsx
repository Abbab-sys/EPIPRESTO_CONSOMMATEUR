import React from "react";
import {useTranslation} from "react-i18next";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const OrdersItem = ({order, goToOrder}:any) => {
  const {t} = useTranslation('translation');

  return (
    <TouchableOpacity  onPress={goToOrder} style={orderStyles.order}>
      <View style={orderStyles.margin}/>
      <View style={orderStyles.orderView}>
        <View style={orderStyles.margin}/>
        <View style={orderStyles.descriptionView}>
          <Text style={orderStyles.titleText}>{order.orderNumber}</Text>
          <Text
            style={[
              orderStyles.statusText,
              {
                color:
                  order.status === 'WAITING_CONFIRMATION'
                    ? 'orange'
                    : order.status === 'CONFIRMED'
                    ? 'violet'
                    : order.status === 'DELIVERED'
                    ? 'green'
                    : order.status === 'IN_DELIVERY'
                    ? 'blue'
                    : 'red',
              },
            ]}>
            {t('OrdersHistory.' + order.status)}
          </Text>
          <Text style={orderStyles.restOfDescriptionText}>
            {order.numberOfProducts} {t('OrdersHistory.item')}
            {order.numberOfProducts > 1 ? 's' : ''} | {(Math.round(order.price * 100) / 100).toFixed(2)} $
          </Text>
          <Text style={orderStyles.restOfDescriptionText}>
            {order.time.toLocaleDateString(t('dateLanguage') as string, {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </Text>
        </View>

        <View style={orderStyles.margin}/>
      </View>
      <View style={orderStyles.margin}/>
    </TouchableOpacity>
  );
};

const orderStyles = StyleSheet.create({
  order: {
    marginBottom: 10,
  },
  margin: {
    flex: 10,
  },
  orderView: {
    flex: 95,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  descriptionView: {
    flex: 188,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: '#000000',
  },
  statusText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: '#000000',
  },
  restOfDescriptionText: {
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    color: 'black'
  },
  buttonView: {
    flex: 122,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonMargin: {
    flex: 40,
  },
  button: {
    flex: 30,
    backgroundColor: '#FFAA55',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Lato',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
  },
});

export default OrdersItem;
