import {useStripe} from '@stripe/stripe-react-native';
import {useContext, useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_STRIPE, GetStripeData} from '../../graphql/queries/GetStripe';
import {Alert} from 'react-native';
import {useCartManager} from './useCartManager';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {ClientAuthenticationContext} from '../../context/ClientAuthenticationContext';

/*
 * Name: Use Checkout Manager
 * Description: This is a custom hook that manages the checkout process.
 * Author: Adam Naoui-Busson, Zouhair Derouich
 */

export const useCheckoutManager = () => {
  const {t} = useTranslation('translation');
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const {submitCartOrder} = useCartManager();
  const navigation = useNavigation();

  const {clientId} = useContext(ClientAuthenticationContext);
  const [getStripe, {data}] = useLazyQuery(GET_STRIPE, {
    fetchPolicy: 'network-only',
  });
  const unwrappedData: GetStripeData = data as GetStripeData;

  const {cart} = useCartManager();

  // Call stripe to get the payment intent
  const checkout = async () => {
    let checkoutParams = [];
    for (const storeVariants of cart.values()) {
      for (const variant of storeVariants.values()) {
        checkoutParams.push({
          variantId: variant.variantId,
          quantity: variant.quantity,
        });
      }
    }
    await getStripe({
      variables: {variantsToOrder: checkoutParams, idClient: clientId},
    });
  };

  // Use effect to initialize the payment sheet
  useEffect(() => {
    if (!unwrappedData) return;
    initPaymentSheet({
      appearance: {
        colors: {
          primary: '#FFAA55',

          componentText: '#FFFFFF',

          primaryText: '#FFAA55',
          placeholderText: '#73757b',
          icon: '#FFAA55',
        },
      },
      customFlow: false,
      defaultBillingDetails: undefined,
      googlePay: undefined,
      merchantDisplayName: 'Epipresto',
      primaryButtonLabel: 'Pay',
      style: 'alwaysDark',
      customerId: unwrappedData.getStripe.stripe.customer,
      customerEphemeralKeySecret: unwrappedData.getStripe.stripe.ephemeralKey,
      paymentIntentClientSecret: unwrappedData.getStripe.stripe.paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    }).then(r => {
      if (!r.error) {
        setLoading(true);
      }
      presentPaymentSheet().then(r => {
        if (!r.error) {
          submitCartOrder().then(orderId => {
            Alert.alert(t('ShoppingCart.alertMessage'));
            navigation.navigate(
              'Order' as never,
              {orderId: orderId, goBack: navigation.goBack} as never,
            );
          });
        }
      });
    });
  }, [
    unwrappedData?.getStripe.stripe.customer,
    unwrappedData?.getStripe.stripe.paymentIntent,
  ]);

  return {
    checkout,
    loading,
  };
};
