import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import {GET_PRODUCT_VARIANTS_BY_ID} from '../../graphql/queries/GetProductVariantsById';
import Product, {VariantProps} from '../stores/subsections/Product';
import {productPageStyles} from './ProductPageStyles';
import {useCartManager} from '../../hooks/management/useCartManager';
import {useTranslation} from 'react-i18next';

/*
 * Name: Product Page
 * Description: This file is used to display the product page with the product component.
 * Author: Alessandro van Reusel, Khalil Zriba, Adam Naoui-Busson
 */

const ProductPage = ({idProduct, goBack, route}: any) => {
  const {t} = useTranslation('translation');

  let finalGoBack = goBack;
  if (route?.params?.goBack) {
    finalGoBack = route.params.goBack;
  }
  let finalIdProduct = idProduct;
  if (route?.params?.idProduct) {
    finalIdProduct = route.params.idProduct;
  }

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  const [variants, setVariants] = useState<VariantProps[]>([]);

  // Query to get the product variants
  const {data, loading, error, fetchMore} = useQuery(
    GET_PRODUCT_VARIANTS_BY_ID,
    {
      variables: {
        idProduct: finalIdProduct,
        offset: 0,
      },
      fetchPolicy: 'network-only',
      onCompleted(data) {
        const product = data.getProductById.product;
        const publishedVariants = product.variants.filter((variant: any) => {
          return variant.availableForSale;
        });
        setVariants(publishedVariants);
      },
    },
  );

  // Use effect to set the timeout for the snackbar (3 seconds)
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => onDismissSnackBar(), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [visible]);

  const {addVariantToCart} = useCartManager();

  return (
    <SafeAreaView>
      <View style={productPageStyles.view}>
        <TouchableOpacity
          disabled={false}
          style={productPageStyles.back_button}
          onPress={() => {
            finalGoBack();
          }}>
          <Image
            style={productPageStyles.back_button_icon}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text variant="headlineMedium" style={productPageStyles.headline}>
          {data ? data.getProductById.product.title : 'Loading'}
        </Text>
        <Text variant="labelLarge">
          {data ? data.getProductById.product.relatedStore.name : ''}
        </Text>
      </View>
      <SafeAreaView>
        {loading ? (
          <View style={productPageStyles.innerContainer}>
            <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
          </View>
        ) : error ? (
          <View style={productPageStyles.innerContainer}>
            <Text style={productPageStyles.errorText}>
              {t('store.data.error')}
            </Text>
          </View>
        ) : variants.length === 0 ? (
          <Text>{t('store.data.noProducts')}</Text>
        ) : (
          <FlatList
            numColumns={2}
            data={variants}
            renderItem={({item}) => (
              <Product
                _id={item._id}
                displayName={item.displayName}
                imgSrc={
                  item.imgSrc
                    ? item.imgSrc
                    : 'https://img.icons8.com/ios/452/no-image.png'
                }
                stock={item.stock}
                price={item.price}
                byWeight={item.byWeight}
                taxable={item.taxable}
                relatedProduct={item.relatedProduct}
                availableForSale={item.availableForSale}
                addToCart={(quantity: Float) => {
                  addVariantToCart(
                    {
                      variantId: item._id,
                      variantName: item.displayName,
                      storeId: data.getProductById.product.relatedStore._id,
                      storeName: data.getProductById.product.relatedStore.name,
                      price: item.price,
                      imageSrc: item.imgSrc
                        ? item.imgSrc
                        : 'https://img.icons8.com/ios/452/no-image.png',
                      taxable: item.taxable,
                    },
                    quantity,
                  );
                  onToggleSnackBar();
                }}
                relatedStoreIsPaused={item.relatedStoreIsPaused}
              />
            )}
            keyExtractor={item => item._id}
            onEndReachedThreshold={1}
            onEndReached={() => {
              if (
                data.getProductById.product.variants.length > variants.length
              ) {
                fetchMore({
                  variables: {
                    offset: variants.length,
                  },
                  updateQuery: (prev, {fetchMoreResult}) => {
                    if (!fetchMoreResult) return prev;
                    const remainingVariants =
                      fetchMoreResult.getProductById.product.variants;
                    const publishedVariants = remainingVariants.filter(
                      (variant: any) => {
                        return variant.availableForSale;
                      },
                    );
                    setVariants([...variants, ...publishedVariants]);
                  },
                });
              }
            }}
          />
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ProductPage;
