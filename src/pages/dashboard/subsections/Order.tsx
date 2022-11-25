import React from "react";
import {useTranslation} from "react-i18next";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {OrderData} from "../Dashboard";
import {useNavigation} from "@react-navigation/native";

export interface OrderProps {
  orderData: OrderData
}

const Order = (props: OrderProps) => {
  const navigation = useNavigation()
  const {i18n, t} = useTranslation('translation')
  const orderNum = props.orderData.orderNumber
  const orderStatus = t('dashboard.latestOrders.' + props.orderData.logs[props.orderData.logs.length - 1].status)
  const backgroundColor =
    i18n.language === 'fr' ?
      (
        orderStatus === 'ATTENTE DE CONFIRMATION'
          ? 'orange'
          : orderStatus === 'CONFIRMÉ'
            ? 'violet'
            : orderStatus === 'EN LIVRAISON'
              ? 'blue'
              : orderStatus === 'DÉLIVERÉ'
                ? 'green'
                : 'red'
      ) : (
        orderStatus === 'WAITING CONFIRMATION'
          ? 'orange'
          : orderStatus === 'CONFIRMED'
            ? 'violet'
            : orderStatus === 'IN DELIVERY'
              ? 'blue'
              : orderStatus === 'DELIVERED'
                ? 'green'
                : 'red'
      )


  const orderStyles = StyleSheet.create({
    root: {
      backgroundColor: '#F2F4F8',
      elevation: 4,
      borderRadius: 10,
      margin: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    
    },
    text: {
      color: '#000000',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      margin: 10
    },
    orderStatus: {
      backgroundColor: backgroundColor,
      borderRadius: 10,
      elevation: 4,
      margin: 10,
      padding: 10
    }
  })
  const navigateToOrder = () => {
    navigation.navigate('Order' as never, {orderId: props.orderData._id,goBack:navigation.goBack} as never);
  };
  return (
    <SafeAreaView style={orderStyles.root}>
      <TouchableOpacity onPress={navigateToOrder} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={orderStyles.text}>
          #{orderNum}
        </Text>
        <View style={orderStyles.orderStatus}>
          <Text>
            {orderStatus}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Order;
