import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Searchbar, Snackbar, Text} from 'react-native-paper';
import {useLazyQuery} from '@apollo/client';
import {storeStyles} from './StoreStyles';
import {GET_STORE_VARIANTS_BY_ID} from '../../graphql/queries/GetStoreVariantsById';
import Product, {VariantProps} from './subsections/Product';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import {useTranslation} from 'react-i18next';
import {useCartManager} from '../../hooks/management/useCartManager';
import {useIsFocused} from '@react-navigation/native';

/*
 * Name: Store
 * Description: This file is used to display the store component.
 * Author: Khalil Zriba, Alessandro van Reusel, Adam Naoui-Busson, Ryma Messedaa
 */

export interface StoreProps {
  _id: string;
  name: string;
  address: string;
  isOpen: boolean;
  isPaused: boolean;
  shopCategory: string;
  disponibilities: string[];
}

const Store = ({route}: any) => {
  const finalStoreId = route.params.idStore;
  const finalGoBack = route.params.goBack;

  const {t} = useTranslation('translation');

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  const storeId = finalStoreId;

  const [searchQuery, setSearchQuery] = useState('');

  const [variants, setVariants] = useState<VariantProps[]>([]);

  const [store, setStore] = useState<StoreProps>();

  // Handle search by calling getItems with the searchQuery as a parameter
  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchQuery(text);
    getItems();
  };

  const isFocused = useIsFocused();

  // Use Effect to call getItems when the screen is focused
  useEffect(() => {
    if (!isFocused) return;
    getItems();
  }, [isFocused]);

  // Query to get the store and its variants by id with pagination and search
  const [getItems, {loading, error, data, fetchMore}] = useLazyQuery(GET_STORE_VARIANTS_BY_ID, {
    variables: {
      idStore: storeId,
      offset: 0,
      first: -1,
      searchText: searchQuery,
      filterAvailable: true,
      variantsOffset2: 0,
      variantsFirst2: -1,
      variantsFilterAvailable2: true
    },
  }
  );

  // Use Effect to set the variants and store when the data is loaded
  useEffect(() => {
    if (data && data.getStoreById) {
      setStore(data.getStoreById.store)
      const products = data.getStoreById.store.products
      // get all variants of all products
      const variants = products.map((product: any) => {
        return product.variants
      })
      // flatten array of arrays
      const variantsArray = [].concat.apply([], variants)
      setVariants(variantsArray)
    }
  }, [data]);

  const searchPlaceholder = t('store.search.placeholder');

  // Use Effect to dismiss the snackbar after 3 seconds
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => onDismissSnackBar(), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [visible]);

  //useCartManager
  const {addVariantToCart} = useCartManager();

  return (
    <SafeAreaView style={storeStyles.root}>
      <View style={storeStyles.titleWrapper}>
        <TouchableOpacity
          disabled={false}
          style={storeStyles.back_button}
          onPress={() => {
            finalGoBack();
          }}>
          <Image
            style={storeStyles.back_button_icon}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={storeStyles.title}>
          {store ? store.name : t('store.data.loading')}
        </Text>
      </View>
      <View style={storeStyles.view}>
        <Text
          variant="labelLarge"
          style={
            data
              ? !data.getStoreById.store.isOpen ||
                data.getStoreById.store.isPaused
                ? {color: 'red'}
                : {color: 'green'}
              : {}
          }>
          {store
            ? store.isOpen && !store.isPaused
              ? t('store.open')
              : store.isPaused
              ? t('store.paused')
              : t('store.closed')
            : ''}
        </Text>
        <Text variant="labelSmall">{store ? store.address : ''}</Text>
      </View>
      <View>
        <Searchbar
          style={storeStyles.searchBar}
          placeholder={searchPlaceholder}
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      <SafeAreaView style={{flex: 1}}>
        {loading ? (
          <View style={storeStyles.innerContainer}>
            <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
          </View>
        ) : error ? (
          <View style={storeStyles.innerContainer}>
            <Text style={storeStyles.errorText}>{t('store.data.error')}</Text>
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
                // if no image, use default image
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
                relatedStoreIsPaused={data.getStoreById.store.isPaused}
                addToCart={(quantity: Float) => {
                  addVariantToCart(
                    {
                      variantId: item._id,
                      variantName: item.displayName,
                      storeId: storeId,
                      storeName: data.getStoreById.store.name,
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
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  getItems();
                }}
              />
            }
          />
        )}
      </SafeAreaView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{backgroundColor: '#F2F4F8'}}
        theme={{colors: {surface: 'black'}}}
        action={{
          label: 'Ok',
          onPress: () => {},
        }}>
        {t('store.addProduct.success')}
      </Snackbar>
    </SafeAreaView>
  );
};

export default Store;
