import React from "react";
import {StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, TouchableOpacity} from "react-native";
import {useCartManager} from "../../hooks/management/useCartManager";

export const Cart = () => {
  const lol = "A";

  const {cart, cartView, addVariantToCart} = useCartManager();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={() => {
          addVariantToCart({
            variantId: "63629531ca12e62114e0e3af",
            variantName:"Sandwich",
            storeId: "63629531ca12e62114e0e3af",
            storeName: "Cafet Poly",
            price: 2.5,
            imageSrc: "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4150.png",
            taxable: true,
          })
        }}>
          <Text style={styles.nextButtonText}>Add sandwich</Text>
        </ TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={() => {
          addVariantToCart({
            variantId: "63629531ca12e62114e0e3ae",
            variantName:"Sandwich 2",
            storeId: "63629531ca12e62114e0e3af",
            storeName: "Cafet Poly",
            price: 2.5,
            imageSrc: "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4150.png",
            taxable: true,
          })
        }}>
          <Text style={styles.nextButtonText}>Add sandwich 2</Text>
        </ TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={() => {
          addVariantToCart({
            variantId: "63629531ca12e62114e0e3qf",
            variantName:"Rouge a levre",
            storeId: "63629531ca12e6211qe0e3af",
            storeName: "Cafet Poly 2 ",
            price: 9.5,
            imageSrc: "https://cdn.shopify.com/s/files/1/0560/5500/5243/products/exfoliant-a-levre-1.jpg?v=1641949855",
            taxable: true,
          })
        }}>
          <Text style={styles.nextButtonText}>Add rouge a levre</Text>
        </ TouchableOpacity>
      </View>
    </SafeAreaView>)
};

const styles = StyleSheet.create({
  upperUnsafeAreaView: {
    flex: 0,
    backgroundColor: '#FDFDFD',
  },
  lowerUnsafeAreaView: {
    flex: 0,
    backgroundColor: '#FFAA55',
  },
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  titleWrapper: {
    flex: 313,
    justifyContent: 'center',
  },
  topMargin: {
    flex: 60,
  },
  title: {
    flex: 45,
    alignSelf: 'center',
  },
  cartView: {
    flex: 1,
  },
  epiprestoTitle: {
    fontSize: 48,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 48,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
  },
  descriptionContainer: {
    flex: 96,
  },
  description: {
    flex: 1,
    flexWrap: 'wrap',
    alignContent: 'center',
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    color: "#000000",
    margin: '5%',
  },

  inputs: {
    flex: 258,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: '100%',

  },

  nextButtonText: {
    fontFamily: "Lato",
    fontSize: 22,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    letterSpacing: -0.02,
    alignSelf: "center",
    color: "#000000"
  },
  loginButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nextButton: {
    borderRadius: 12,
    backgroundColor: "#FDFDFD",
    alignSelf: "center",
    justifyContent: "center",
    width: '36%',
  },
  bottomTextContainer: {
    flex: 131,
  },
  bottomTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomText: {
    borderRadius: 12,
  },
  new: {
    fontFamily: "Lato",
    fontSize: 15,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    color: "#000000"
  },
  create: {
    fontFamily: "Lato",
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    color: "#000000"
  }


})
