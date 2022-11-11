import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

export interface ShopProps {
  shopName: string;
  isOpen: boolean;
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
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      opacity: props.isOpen ? 1 : 0.6
    },
    text: {
      color: '#000000',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      textAlign: 'center'
    },
    image: {
      height: 60,
      width: 60, 
      alignSelf: 'center'
    },
  })

  return(
    <SafeAreaView style={categoryStyles.root}>
      <TouchableOpacity disabled={!props.isOpen}>
        <Image source={require('../../../assets/images/shop.png')} style={categoryStyles.image}></Image>
        <Text numberOfLines={2} style={categoryStyles.text}>
          {props.shopName}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Shop;