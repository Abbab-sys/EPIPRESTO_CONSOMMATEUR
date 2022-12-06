import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

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
  const {t} = useTranslation('translation')
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
    },
    text: {
      color: '#000000',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      textAlign: 'center',
    },
    image: {
      height: 50,
      width: 50,
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
    <TouchableOpacity style={categoryStyles.root} onPress={navigateToShop}>
      <SafeAreaView>
        <Text
          style={[
            {textAlign: 'center'},
            props.isOpen
              ? {color: 'green'}
              : {color: 'red'},
          ]}>
          {props.isOpen
            ? t('stores.store.open')
            : t('stores.store.closed')}
        </Text>
        <Image
          source={require('../../../assets/images/shop.png')}
          style={categoryStyles.image}></Image>
        <Text numberOfLines={2} style={categoryStyles.text}>
          {props.shopName}
        </Text>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

export default Shop;
