import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface OrderProps {
  orderNum: string;
  orderStatus: string;
  //navigation: () => {}
} 

const Order = (props: OrderProps) => {

  const {i18n} = useTranslation('translation')

  const backgroundColor = 
    i18n.language === 'fr' ? 
    (
      props.orderStatus === 'ATTENTE DE CONFIRMATION' 
      ? 'gold'
      : props.orderStatus === 'CONFIRMÉ'
      ? 'green'
      : props.orderStatus === 'EN LIVRAISON'
      ? 'blue'
      : props.orderStatus === 'DÉLIVERÉ'
      ? '#86FFA8'
      : 'red'
    ) : (
      props.orderStatus === 'WAITING CONFIRMATION' 
      ? 'gold'
      : props.orderStatus === 'CONFIRMED'
      ? 'green'
      : props.orderStatus === 'IN DELIVERY'
      ? 'blue'
      : props.orderStatus === 'DELIVERED'
      ? '#86FFA8'
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

  return(
    <SafeAreaView style={orderStyles.root}>
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={orderStyles.text}>
          #{props.orderNum}
        </Text>
        <View style={orderStyles.orderStatus}>
          <Text>
            {props.orderStatus}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Order;