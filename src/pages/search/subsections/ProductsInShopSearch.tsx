import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet, SafeAreaView } from "react-native";
import {useNavigation} from "@react-navigation/native";

interface ShopWithProductsProps {
  id: string;
  imgSrc: any;
  title: string;
  // navigation: () => {}
}

const ProductsInShopSearch = (props: ShopWithProductsProps) => {
  const navigation = useNavigation()
  const navigateToProduct = () => {
    navigation.navigate('ProductPage' as never, {idProduct: props.id,goBack:navigation.goBack} as never);
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={navigateToProduct} style={styles.root}>
          <Image
            source={
              props.imgSrc.length > 0
              ? {uri: props.imgSrc}
              : require('../../../assets/images/logo.png')
            }
            style={styles.image}
            />
        <Text numberOfLines={2} style={styles.productText}>{props.title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 100,
    width: 100,
    borderRadius: 10,
    margin: 10,
    padding: '1%',
    backgroundColor: '#F2F4F8',
    elevation: 4,
    flexDirection: 'column',
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  productText: {
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    alignSelf: 'center',
    color: 'black',
  }
})

export default ProductsInShopSearch;
