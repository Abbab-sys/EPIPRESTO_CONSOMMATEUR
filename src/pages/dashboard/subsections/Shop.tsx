import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/*
 * Name: Shop
 * Description: This file is used to display a shop for the nearby shops section in the dashboard page.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

export interface ShopProps {
  shopName: string;
  idStore: string;
  isOpen: boolean;
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
      opacity: props.isOpen ? 1 : 0.6,
    },
    text: {
      color: '#000000',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      textAlign: 'center',
    },
    image: {
      height: 60,
      width: 60,
      alignSelf: 'center',
    },
  });
  const navigation = useNavigation();

  // Navigate to the shop page
  const navigateToShop = () => {
    navigation.navigate(
      'Store' as never,
      {idStore: props.idStore, goBack: navigation.goBack} as never,
    );
  };

  return (
    <SafeAreaView style={categoryStyles.root}>
      <TouchableOpacity disabled={!props.isOpen} onPress={navigateToShop}>
        <Image
          source={require('../../../assets/images/shop.png')}
          style={categoryStyles.image}></Image>
        <Text numberOfLines={2} style={categoryStyles.text}>
          {props.shopName}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Shop;
