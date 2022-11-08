import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export interface OrderProps {
  orderNum: number;
  orderStatus: string;
  //navigation: () => {}
} 

const Order = (props: OrderProps) => {

  const backgroundColor = 
    props.orderStatus === 'WAITING_CONFIRMATION' 
    ? 'gold'
    : props.orderStatus === 'CONFIRMED'
    ? 'green'
    : props.orderStatus === 'IN_DELIVERY'
    ? 'blue'
    : props.orderStatus === 'DELIVERED'
    ? '#86FFA8'
    : 'red'

  const orderStyles = StyleSheet.create({
    root: {
      flex: 1,
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

  return(
    <SafeAreaView style={orderStyles.root}>
      <Text style={orderStyles.text}>
        #EP {props.orderNum}
      </Text>
      <View style={orderStyles.orderStatus}>
        <Text>
          {props.orderStatus}
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Order;