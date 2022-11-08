import React from "react";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";

export interface ShopProps {
  shopName: string;
  //navigation: () => {}
} 

const Shop = (props: ShopProps) => {

  const categoryStyles = StyleSheet.create({
    root: {
      backgroundColor: '#F2F4F8',
      elevation: 4,
      borderRadius: 10,
      width: 110,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    text: {
      color: '#000000',
      fontFamily: 'Lato',
      fontStyle: 'normal',
    }
  })

  return(
    <SafeAreaView style={categoryStyles.root}>
      <Image source={require('../../../assets/images/shop.png')} style={{height: 60, width: 60}}></Image>
      <Text style={categoryStyles.text}>
        {props.shopName}
      </Text>
    </SafeAreaView>
  )
}

export default Shop;