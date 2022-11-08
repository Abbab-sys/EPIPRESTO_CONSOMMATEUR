import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { ProductVariant } from "../../../interfaces/OrderInterface";

const OrderedProduct = ({variant}: {variant: ProductVariant}) => {
  // TODO useState for width
  const [width, setWidth] = useState<number>(-1);
  const [isWidthSet, setIsWidthSet] = useState<boolean>(false);
    return (
      <View style={styles.cartItem}>
        <View style={styles.margin}></View>
        <View style={styles.imageWrapper}>
          <View onLayout={(e)=> {
            if (!isWidthSet) {
              setWidth(e.nativeEvent.layout.width);
              setIsWidthSet(true);
            }
          }} style={styles.imageMargin} />
          <Image
            source={variant.imageSrc.length > 0 ? {uri: variant.imageSrc} : require('../../../assets/images/logo.png')}
            style={[styles.image, {width: width}]}
          />
          <View style={styles.imageMargin} />
        </View>
        <View style={styles.margin} />
        <View style={styles.margin} />
        <View style={styles.productInfo}>
          <View style={styles.productInfoTopMargin} />
          <Text
            allowFontScaling={false}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.productName}>
            {variant.productName}
          </Text>
          <Text
            allowFontScaling={false}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.variantProductName}>
            {variant.variantName}
          </Text>
          <View style={styles.priceAndQuantityWrapper}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.cartItemPrice}>
                {(Math.round(variant.price*100)/100).toFixed(2)} $
              </Text>
              <Text style={styles.quantityLetter}>x{variant.quantity}</Text>
          </View>
          <View style={styles.productInfoBottomMargin} />
        </View>
        <View style={styles.margin} />
        <View style={styles.margin} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    cartItem: {
      backgroundColor: '#F2F4F8',
      borderRadius: 10,
      marginTop: 10,
      flexDirection: 'row',
      flex: 1,
    },
    margin: {
      flex: 10,
    },
    imageWrapper: {
      flex: 71,
      flexDirection: 'column',
    },
    imageMargin: {
      flex: 17,
    },
    image: {
      flex: 1,
      height: 100,
      resizeMode: 'contain',
    },
    productInfo: {
      flex: 219,
      flexDirection: 'column',
    },
    productInfoTopMargin: {
      flex: 19,
    },
    productName: {
      fontSize: 24,
      fontWeight: '600',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      color: '#000000',
      includeFontPadding: false,
    },
      variantProductName: {
      fontSize: 15,
      fontWeight: '400',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      includeFontPadding: false,
      },
      priceAndQuantityWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      },
    cartItemPrice: {
      fontSize: 15,
      fontWeight: '700',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      color: '#000000',
      includeFontPadding: false,
    },
    productInfoBottomMargin: {
      flex: 45,
    },
    quantityLetter: {
      fontFamily: 'Lato',
      fontSize: 24,
      fontWeight: '600',
      fontStyle: 'normal',
      color: '#000000',
      includeFontPadding: false,
  
    },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
    },
  
  });

  export default OrderedProduct;