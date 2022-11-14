import {useStripe} from "@stripe/stripe-react-native";
import {useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {GET_STRIPE, GetStripeData} from "../../graphql/queries/GetStripe";
import {Alert} from "react-native";
import {useCartManager} from "./useCartManager";

export const useCheckoutManager = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const [getStripe, {data}] = useLazyQuery(GET_STRIPE, {
    fetchPolicy: "network-only",
  });
  const unwrappedData: GetStripeData = data as GetStripeData;

  const {cart} = useCartManager()

  const checkout = async () => {
    let checkoutParams = []
    for (const storeVariants of cart.values()) {
      for (const variant of storeVariants.values()) {
        checkoutParams.push({
          variantId: variant.variantId,
          quantity: variant.quantity,
        })
      }
    }
    //TODO add id variant and qty and discount
    await getStripe({variables: {variantsToOrder: checkoutParams}});
  }

  useEffect(() => {
    if (!unwrappedData) return;
    console.log("unwrappedData", unwrappedData);
    initPaymentSheet({
      appearance: {
        colors: {
          primary: '#FFAA55',
          background: '#FDFDFD',
          componentBackground: '#FDFDFD',
          primaryText: '#FFAA55',
          placeholderText: '#73757b',
          icon: "#FFAA55",
        },
      },
      customFlow: false,
      defaultBillingDetails: undefined,
      googlePay: undefined,
      merchantDisplayName: "Epipresto",
      primaryButtonLabel: "Pay",
      style: "automatic",
      customerId: unwrappedData.getStripe.stripe.customer,
      customerEphemeralKeySecret: unwrappedData.getStripe.stripe.ephemeralKey,
      paymentIntentClientSecret: unwrappedData.getStripe.stripe.paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true
    }).then(r => {
      if (!r.error) {
        setLoading(true);
      }
      presentPaymentSheet().then(r => {
        if (!r.error) {
          Alert.alert("Payment successful!");
        }
      });
    });
  }, [unwrappedData?.getStripe.stripe.customer, unwrappedData?.getStripe.stripe.paymentIntent]);

  return {
    checkout,
    loading
  }
}
