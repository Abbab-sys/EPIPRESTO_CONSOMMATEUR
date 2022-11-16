import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCartManager} from '../../hooks/management/useCartManager';
import {useCheckoutManager} from "../../hooks/management/useCheckoutManager";


const ShoppingCart = () => {
  const {t} = useTranslation('translation');
  const {
    cartView,
    cartSubTotal,
    cartDeliveryCost,
    cartTaxedSubTotal,
    quantityErrorSnackbar,
  } = useCartManager();

  const {checkout} = useCheckoutManager()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
          <Text
            style={styles.title}>
            {t('ShoppingCart.title')}
          </Text>
      </View>
      <View style={styles.orderDetailsView}>
        <View style={styles.orderDetailsWrapper}>
          <Text
            style={styles.orderDetails}>
            {t('ShoppingCart.orderDetails')}
          </Text>
        </View>
        <View style={styles.orderDetailBottomMargin}/>
      </View>
      <View style={styles.productsView}>{cartView}</View>
      <View style={styles.dividerView}>
        <View style={styles.dividerMargin}/>
        <Divider style={styles.divider}></Divider>
        <View style={styles.dividerMargin}/>
      </View>
      <View style={styles.pricesView}>
        <View style={styles.pricesViewMargin}/>
        <View style={styles.priceTextView}>
          <Text style={styles.priceText}>{t("Prices.subTotal")}</Text>
          <Text style={styles.priceNumber}>
            ${((cartSubTotal * 100) / 100).toFixed(2)}
          </Text>
        </View>
        <View style={styles.spaceBetweenPrices}/>
        <View style={styles.priceTextView}>
          <Text style={styles.priceText}>{t("Prices.taxes")}</Text>
          <Text style={styles.priceNumber}>${(Math.round(cartTaxedSubTotal * 100) / 100).toFixed(2)}</Text>
        </View>
        <View style={styles.spaceBetweenPrices}/>
        <View style={styles.priceTextView}>
          <Text style={styles.priceText}>{t("Prices.delivery")}</Text>
          <Text style={styles.priceNumber}>
            ${((cartDeliveryCost * 100) / 100).toFixed(2)}
          </Text>
        </View>
        <View style={styles.spaceBetweenDeliveryAndTotal}/>
        <View style={styles.priceTextView}>
          <Text style={styles.totalText}>{t("Prices.total")}</Text>
          <Text style={styles.totalNumber}>
            $
            {(((cartSubTotal + cartDeliveryCost + cartTaxedSubTotal) * 100) /
              100).toFixed(2)}
          </Text>
        </View>
        <View style={styles.pricesViewMargin}/>
      </View>
      <View style={styles.buttonView}>
        <View style={styles.buttonMargin}/>
        <TouchableOpacity
          style={cartSubTotal <= 0 ? {...styles.button, backgroundColor: "grey"} : styles.button}
          onPress={checkout}
          disabled={cartSubTotal <= 0}>
          <Text style={styles.buttonText}>{t("ShoppingCart.checkout")}</Text>
        </TouchableOpacity>
        <View style={styles.buttonMargin}/>
      </View>
      {quantityErrorSnackbar}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
  },
  titleView: {
    flex: 118,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
    color: '#000000',
    textAlignVertical: 'center',
  },
  orderDetailsView: {
    flex: 50,
  },
  orderDetailsWrapper: {
    flex: 35,
  },
  orderDetailBottomMargin: {
    flex: 15,
  },
  orderDetails: {
    flex: 1,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 24,
    color: '#FFAA55',
  },
  productsView: {
    flex: 293,
  },
  dividerView: {
    flex: 39,
  },
  dividerMargin: {
    flex: 20,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#FFAA55',
  },
  pricesView: {
    flex: 148,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F2F4F8',
    borderRadius: 10,
  },
  pricesViewMargin: {
    flex: 10,
  },
  priceTextView: {
    flex: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spaceBetweenPrices: {
    flex: 6,
  },
  spaceBetweenDeliveryAndTotal: {
    flex: 16,
  },
  priceText: {
    alignContent: 'flex-start',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 15,
    color: 'black',
  },
  priceNumber: {
    alignContent: 'flex-end',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 15,
    color: 'black',
  },
  totalText: {
    alignContent: 'flex-start',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    color: 'black',
  },
  totalNumber: {
    alignContent: 'flex-end',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 15,
    color: '#FFAA55',
  },
  buttonView: {
    flex: 80,
    alignItems: 'center',
  },
  buttonMargin: {
    flex: 20,
  },
  button: {
    flex: 40,
    backgroundColor: '#FFAA55',
    borderRadius: 40,
    width: '76%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default ShoppingCart;
