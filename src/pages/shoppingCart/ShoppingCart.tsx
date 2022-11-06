import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenContainer} from 'react-native-screens';
import {useCartManager} from '../../hooks/management/useCartManager';
import {RootStackParamList} from '../../navigation/Navigation';


const ShoppingCart = () => {
  const {
    cart,
    cartView,
    addVariantToCart,
    getCartSubTotal,
    getCartDeliveryCost,
    getTaxedCartSubTotal,
    quantityErrorSnackbar,
  } = useCartManager();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <View style={styles.marginTop} />
        <View style={styles.titleWrapper}>
          <Text
            style={styles.title}>
            SHOPPING CART
          </Text>
        </View>
        <View style={styles.marginBottom} />
      </View>
      <View style={styles.orderDetailsView}>
        <View style={styles.orderDetailsWrapper}>
          <Text
            style={styles.orderDetails}>
            Order Details
          </Text>
        </View>
        <View style={styles.orderDetailBottomMargin} />
      </View>
      <View style={styles.productsView}>{cartView}</View>
      <View style={styles.dividerView}>
        <View style={styles.dividerMargin} />
        <Divider style={styles.divider}></Divider>
        <View style={styles.dividerMargin} />
      </View>
      <View style={styles.pricesView}>
        <View style={styles.pricesViewMargin} />
        <View style={styles.priceTextView}>
          <Text style={styles.priceText}>Subtotal</Text>
          <Text style={styles.priceNumber}>
            ${Math.round(getCartSubTotal() * 100) / 100}
          </Text>
        </View>
        <View style={styles.spaceBetweenPrices} />
        <View style={styles.priceTextView}>
          <Text style={styles.priceText}>Taxes</Text>
          <Text style={styles.priceNumber}>${Math.round(getTaxedCartSubTotal() * 100) / 100}</Text>
        </View>
        <View style={styles.spaceBetweenPrices} />
        <View style={styles.priceTextView}>
          <Text style={styles.priceText}>Delivery Fee</Text>
          <Text style={styles.priceNumber}>
            ${Math.round(getCartDeliveryCost() * 100) / 100}
          </Text>
        </View>
        <View style={styles.spaceBetweenDeliveryAndTotal} />
        <View style={styles.priceTextView}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalNumber}>
            $
            {Math.round((getCartSubTotal() + getCartDeliveryCost() + getTaxedCartSubTotal()) * 100) /
              100}
          </Text>
        </View>
        <View style={styles.pricesViewMargin} />
      </View>
      <View style={styles.buttonView}>
        <View style={styles.buttonMargin} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}>
          <Text style={styles.buttonText}>CHECKOUT</Text>
        </TouchableOpacity>
        <View style={styles.buttonMargin} />
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
  },
  marginTop: {
    flex: 20,
  },
  marginBottom: {
    flex: 29,
  },
  titleWrapper: {
    flex: 35,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
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
